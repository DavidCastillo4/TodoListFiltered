
let arrayOfTodos;
let isFetchComplete = 0;
let selectedValue = '';
let userId = document.getElementById('userId');
let completion = document.getElementById('completion');
let olCreated = 0;
let url = 'people.json';
//let url = 'https://jsonplaceholder.typicode.com/todos'

async function fetchTodos() {
  if (isFetchComplete == 0) {
    let response = await fetch(url)
    arrayOfTodos = await response.json();
    isFetchComplete = 1;
  }
}

let removeList = () => {
  if (olCreated == 1) {
    let myList = document.querySelector('ol');
    myList.remove();
  }
}

async function logTodos() {
  await fetchTodos()
  console.log(arrayOfTodos)
}

async function populateTodos() {
  removeList();
  await fetchTodos();

  let ol = document.createElement('ol');
  ol.style.marginTop = "50px"
  let arr;
  if (selectedValue == 'true' || selectedValue == 'false') {
    arr = arrayOfTodos.filter(e => e.completed.toString() == selectedValue)
  } else {
    arr = arrayOfTodos.filter(e => e.userId == selectedValue)
  }
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    let tf = arr[i].completed
    if (!tf) {
      li.style.backgroundColor = "#ffb3b3"
    }
    li.style.border = '1px solid black';
    let txt = 'id=' + arr[i].id
      + ';userId=' + arr[i].userId
      + ';completed=' + tf
      + ';title=' + arr[i].title
    li.innerHTML = txt;
    ol.appendChild(li);
  }
  olCreated = 1;
  document.getElementById('sectionTop').insertAdjacentElement("afterend", ol)
}

let userClick = (e) => {
  selectedValue = e.value;
  populateTodos()
  if (e.id == 'userId') {
    $(completion).selectpicker('val', '');
  }
  if (e.id == 'completion')
    $(userId).selectpicker('val', '');
}

