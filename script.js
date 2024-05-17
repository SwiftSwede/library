const myLibrary = [];
const container = document.getElementById("container");
const author = document.getElementById("author");
const name = document.getElementById("book");
const pages = document.getElementById("pages");
const yesNo = document.getElementsByName("yesNo");
const popUp = document.getElementById("popUp");
const button = document.getElementById("btnPopUp");
const buttonAdd = document.getElementById("btnAddBook");
let valueAuthor;
let valueBook;
let valuePages;
let valueYesNo;

button.addEventListener("click", () => {
  popUp.style.visibility =
    popUp.style.visibility === "visible" ? "hidden" : "visible";
  console.log("clicked");
});

buttonAdd.addEventListener("click", () => {
  // clearMyLibrary();
  valueAuthor = author.value;
  valueBook = name.value;
  valuePages = pages.value;
  for (i = 0; i < yesNo.length; i++) {
    if (yesNo[i].checked) valueYesNo = yesNo[i].value;
  }
  const book = new Book(valueAuthor, valueBook, valuePages, valueYesNo);
  addBookToLibrary(book);
  console.log(myLibrary);
  clearFields();
  popUp.style.visibility = "hidden";
  displayMyLibrary();
});

function Book(author, name, pages, read) {
  this.author = author;
  this.name = name;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function clearFields() {
  author.value = "";
  name.value = "";
  pages.value = "";
  document.querySelector('input[name="yesNo"]:checked').checked = false;
}

function displayMyLibrary() {
  // for (let i = 0; i < array.length; i++) {
  //   div = document.createElement("div");
  //   div.classList.add("bookCard");
  //   h2 = document.createElement("h2");
  //   h2.innerHTML = array[i].name;
  //   authorText = document.createElement("p");
  //   authorText.classList.add("author");
  //   authorText.innerHTML = array[i].author;
  //   pagesInfo = document.createElement("p");
  //   pagesInfo.innerHTML = array[i].pages;
  //   readInfo = document.createElement("p");
  //   readInfo.innerHTML = array[i].read;
  //   div.appendChild(h2);
  //   div.appendChild(authorText);
  //   div.appendChild(pagesInfo);
  //   div.appendChild(readInfo);
  //   container.appendChild(div);
  // }
  let currentIndex = myLibrary.length - 1;
  div = document.createElement("div");
  div.classList.add("bookCard");
  div.setAttribute("id", `bookCard${currentIndex}`);
  h2 = document.createElement("h2");
  h2.innerHTML = valueBook;
  authorText = document.createElement("p");
  authorText.classList.add("author");
  authorText.innerHTML = valueAuthor;
  pagesInfo = document.createElement("p");
  pagesInfo.innerHTML = valuePages;
  readInfo = document.createElement("p");
  readInfo.innerHTML = valueYesNo;
  changeStatusBtn = document.createElement("button");
  changeStatusBtn.innerHTML = "READ";
  changeStatusBtn.addEventListener("click", () => {
    if (readInfo.textContent === "yes") {
      readInfo.textContent = "no";
    } else {
      readInfo.textContent = "yes";
    }
  });
  removeBtn = document.createElement("button");
  removeBtn.innerHTML = "REMOVE BOOK";
  removeBtn.setAttribute("data-index", currentIndex);
  removeBtn.addEventListener("click", () => {
    let bookToRemove = removeBtn.getAttribute("data-index");
    myLibrary.splice(bookToRemove, 1);
    const elementToRemove = document.getElementById(`bookCard${currentIndex}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }
    updateDataIndices();
    // div.remove();
    console.log(myLibrary);
  });
  div.appendChild(h2);
  div.appendChild(authorText);
  div.appendChild(pagesInfo);
  div.appendChild(readInfo);
  div.appendChild(changeStatusBtn);
  div.appendChild(removeBtn);
  container.appendChild(div);
}

function updateDataIndices() {
  const elements = document.querySelectorAll("[data-index]");
  elements.forEach((element, index) => {
    element.setAttribute("data-index", index);
  });
}
