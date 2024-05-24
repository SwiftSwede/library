//Create constructor for Book
function Book(author, name, pages, read) {
  this.author = author;
  this.name = name;
  this.pages = pages;
  this.read = read;
}

//Set variables for the app
const myLibrary = [];

const author = document.getElementById("author");
const name = document.getElementById("book");
const pages = document.getElementById("pages");
const yesNo = document.getElementsByName("yesNo");
const popUp = document.getElementById("popUp");
const button = document.getElementById("btnPopUp");
const buttonAdd = document.getElementById("btnAddBook");

function createBook() {
  let valueAuthor = author.value;
  let valueBook = name.value;
  let valuePages = pages.value;
  let valueYesNo = "";
  for (i = 0; i < yesNo.length; i++) {
    if (yesNo[i].checked) valueYesNo = yesNo[i].value;
  }
  const book = new Book(valueAuthor, valueBook, valuePages, valueYesNo);
  addBookToLibrary(book);
}
//Create popup on click
button.addEventListener("click", () => {
  popUp.style.visibility =
    popUp.style.visibility === "visible" ? "hidden" : "visible";
});

//Close popUp on click outside of popUp
document.addEventListener("click", (e) => {
  if (!popUp.contains(e.target) && !button.contains(e.target)) {
    popUp.style.visibility = "hidden";
  }
});

//Add book to library and display library on click
buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  createBook();
  displayMyLibrary();
  console.log(myLibrary);
  clearFields();
  popUp.style.visibility = "hidden";
});

//push new book to myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//clear library function
function clearFields() {
  author.value = "";
  name.value = "";
  pages.value = "";
  document.querySelector('input[name="yesNo"]:checked').checked = false;
}

//function to display the library
function displayMyLibrary() {
  const container = document.getElementById("container");
  container.textContent = "";
  let i = 0;
  myLibrary.forEach((book) => {
    const divBookCard = document.createElement("div");
    const divBookInfo = document.createElement("div");
    const h2 = document.createElement("h2");
    const authorText = document.createElement("p");
    const pagesInfo = document.createElement("p");
    const readInfo = document.createElement("p");
    const btnsBookCard = document.createElement("div");
    const changeStatusBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    divBookCard.classList.add("bookCard");
    divBookInfo.classList.add("bookInfo");
    btnsBookCard.classList.add("btnsBookCard");
    authorText.classList.add("author");
    pagesInfo.classList.add("pagesInfo");
    readInfo.classList.add("readInfo");
    removeBtn.setAttribute("class", "removeBtn");
    removeBtn.setAttribute("data-index", i);
    if (book.read === "yes") {
      changeStatusBtn.classList.add("haveReadBtn");
    } else if (book.read === "no") {
      changeStatusBtn.classList.add("haveNotReadBtn");
    }

    h2.innerHTML = book.name;
    authorText.innerHTML = book.author;
    pagesInfo.innerHTML = book.pages;
    readInfo.innerHTML = book.read;
    changeStatusBtn.innerHTML = book.read === "yes" ? "NOT READ" : "READ";
    removeBtn.innerHTML = "REMOVE BOOK";

    const dataId = i.toString();
    divBookCard.setAttribute("data-id", dataId);

    divBookInfo.appendChild(h2);
    divBookInfo.appendChild(authorText);
    divBookInfo.appendChild(pagesInfo);
    divBookInfo.appendChild(readInfo);
    btnsBookCard.appendChild(changeStatusBtn);
    btnsBookCard.appendChild(removeBtn);

    divBookCard.appendChild(divBookInfo);
    divBookCard.appendChild(btnsBookCard);

    container.appendChild(divBookCard);

    i++;
  });
}

displayMyLibrary();

//function to update indices of the myLibrary books
function updateDataIndices() {
  const elements = document.querySelectorAll("[data-index]");
  elements.forEach((element, index) => {
    element.setAttribute("data-index", index);
  });
}

document.getElementById("container").addEventListener("click", (e) => {
  if (e.target.classList.contains("removeBtn")) {
    const bookIndex = parseInt(e.target.closest(".bookCard").dataset.id);
    console.log(bookIndex);
    elementToRemove = e.target.closest(".bookCard");
    if (elementToRemove) {
      elementToRemove.remove();
    }
    removeBook(bookIndex);
  }
});

function removeBook(id) {
  myLibrary.splice(id, 1);
}

//Change read status
document.getElementById("container").addEventListener("click", (e) => {
  if (
    e.target.classList.contains("haveReadBtn") ||
    e.target.classList.contains("haveNotReadBtn")
  ) {
    const bookIndex = parseInt(e.target.closest(".bookCard").dataset.id);
    const bookCard = e.target.closest(".bookCard");
    const readText = bookCard.querySelector(".readInfo");
    const book = myLibrary[bookIndex];

    if (book.read === "yes") {
      book.read = "no";
      readText.innerText = "no";
      e.target.style.backgroundColor = "red";
      e.target.innerHTML = "READ";
      console.log(book);
    } else {
      e.target.innerText = "READ";
      e.target.style.backgroundColor = "green";
      e.target.innerHTML = "NOT READ";
      readText.innerText = "yes";
      book.read = "yes";
      console.log(book);
    }
  }
});
