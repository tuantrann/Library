let myLibrary = [];

var localLibrary = window.localStorage;
let tableContainer = document.getElementById('library-container');
let tableRow = document.getElementById('library-containers');
let bookTitle = document.querySelector('#book-title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let statusRead = document.querySelector("#read");
let statusNotRead = document.querySelector("#not-read");
let submitButton = document.getElementsByClassName('button-div')[0];
getDataFromLocalStorage();
function updateLocalStorage(myLibrary){
  if(!localStorage.getItem("KEY")){
    localLibrary.clear();
  }
  localLibrary = localStorage.setItem("KEY",JSON.stringify(myLibrary));
}

function getDataFromLocalStorage(){
  if (!localStorage.getItem("KEY")){
    myLibrary = [];
  }
  else{
    myLibrary = JSON.parse(localStorage.getItem("KEY"));
    for (let i = 0; i < myLibrary.length; i++){
      let newBookRow = document.createElement("tr");
      let titleR = document.createElement("td");
      let authorR = document.createElement("td");
      let pageR = document.createElement("td");
      let statusR = document.createElement("td");
      let switchR = document.createElement("td");
      let deleteR = document.createElement("td");
      let switchB = document.createElement("button");
      let deleteB = document.createElement("button");

      titleR.innerHTML = myLibrary[i]['title'];
      authorR.innerHTML = myLibrary[i]['author'];
      pageR.innerHTML = myLibrary[i]['page'];
      if (myLibrary[i]['status'] == 1){
        statusR.innerHTML = "Read";
      }
      else{
        statusR.innerHTML = "Not Read";
      }
      statusR.className = "changeStatus"
      switchB.className = "switch";
      deleteB.className = "delete";
      switchB.innerHTML = "Switch";
      deleteB.innerHTML = "X";

      switchR.appendChild(switchB);
      deleteR.appendChild(deleteB);
      newBookRow.appendChild(titleR);
      newBookRow.appendChild(authorR);
      newBookRow.appendChild(pageR);
      newBookRow.appendChild(statusR);
      newBookRow.appendChild(switchR);
      newBookRow.appendChild(deleteR);
      tableRow.appendChild(newBookRow);
      switchB.addEventListener("click", switcheroo);
      deleteB.addEventListener("click", deleteBookFromLibrary);
    }
  }

}

function Book(title, author, page, status) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.page = page;
  this.status = status;
}

function addBookToLibrary() {
  // do stuff here
  if (statusRead.checked){
    status = statusRead.value;
  }
  else{
    status = statusNotRead.value;
  }
  let newBook = new Book(bookTitle.value, author.value, pages.value, status);
  if (bookTitle.value != "" && author.value != "" && pages.value != ""){
    myLibrary.push(newBook);
    updateLocalStorage(myLibrary);
    render();
  }
  else{
    alert("Please fill in the information!");
  }
  bookTitle.value = "";
  author.value = "";
  pages.value = "";

}
function deleteBookFromLibrary(element){
  tableContainer.deleteRow(element.target.parentNode.parentNode.rowIndex);
  myLibrary.splice([element.target.parentNode.parentNode.rowIndex - 1],1);
  updateLocalStorage(myLibrary);
}

function render(){
  let newBookRow = document.createElement("tr");
  let titleR = document.createElement("td");
  let authorR = document.createElement("td");
  let pageR = document.createElement("td");
  let statusR = document.createElement("td");
  let switchR = document.createElement("td");
  let deleteR = document.createElement("td");
  let switchB = document.createElement("button");
  let deleteB = document.createElement("button");

  titleR.innerHTML = myLibrary[myLibrary.length - 1]['title'];
  authorR.innerHTML = myLibrary[myLibrary.length - 1]['author'];
  pageR.innerHTML = myLibrary[myLibrary.length - 1]['page'];
  if (myLibrary[myLibrary.length - 1]['status'] == 1){
    statusR.innerHTML = "Read";
  }
  else{
    statusR.innerHTML = "Not Read";
  }
  statusR.className = "changeStatus"
  switchB.className = "switch";
  deleteB.className = "delete";
  switchB.innerHTML = "Switch";
  deleteB.innerHTML = "X";

  switchR.appendChild(switchB);
  deleteR.appendChild(deleteB);
  newBookRow.appendChild(titleR);
  newBookRow.appendChild(authorR);
  newBookRow.appendChild(pageR);
  newBookRow.appendChild(statusR);
  newBookRow.appendChild(switchR);
  newBookRow.appendChild(deleteR);
  tableRow.appendChild(newBookRow);
  switchB.addEventListener("click", switcheroo);
  deleteB.addEventListener("click", deleteBookFromLibrary);
}




function switcheroo(element){
  myLibrary[element.target.parentNode.parentNode.rowIndex - 1]['status'] *= -1;
  let changeS = element.target.parentNode.parentNode.getElementsByClassName('changeStatus')[0];
  if (myLibrary[element.target.parentNode.parentNode.rowIndex - 1]['status'] == 1){
    changeS.innerHTML = "Read";
    console.log(changeS);
    console.log("Pass");
  }
  else{
    changeS.innerHTML = "Not Read";
    console.log(changeS);
    console.log("PassNot");
  }
  updateLocalStorage(myLibrary);
}


submitButton.addEventListener("click", addBookToLibrary);
