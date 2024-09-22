//Create constructor for Book
class Book {
  constructor(author, name, pages, read) {
    this.author = author;
    this.name = name;
    this.pages = pages;
    this.read = read;
  }
}

//Set variables for the app
const myLibrary = [];

const form = document.querySelector("form");
const author = document.getElementById("author");
const name = document.getElementById("book");
const pages = document.getElementById("pages");
const yesNo = document.getElementsByName("yesNo");
const popUp = document.getElementById("popUp");
const button = document.getElementById("btnPopUp");
const buttonAdd = document.getElementById("btnAddBook");

const titleAuthorRegExp = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
const pagesRegExp = /[0-9]+/i;
const handleWordValidation = (input) => {
  if (!input || typeof input.value === "undefined") {
    return false;
  }
  const isntValid =
    input.value.length === 0 || !titleAuthorRegExp.test(input.value);
  if (isntValid) {
    input.classList.add("invalid");
  } else {
    input.classList.remove("invalid");
    return true;
  }
};

const handleNumberValidation = (input) => {
  if (!input || typeof input.value === "undefined") {
    return false;
  }
  const isntValid = input.value.length === 0 || !pagesRegExp.test(input.value);
  if (isntValid) {
    pages.classList.add("invalid");
  } else {
    pages.classList.remove("invalid");
    return true;
  }
};

const handleRadioValidation = (radioGroupName) => {
  const selectedRadio = document.querySelector(
    `input[name="${radioGroupName}"]:checked`
  );

  if (!selectedRadio) {
    document
      .querySelectorAll(`input[name="${radioGroupName}"]`)
      .forEach((radio) => {
        radio.classList.add("invalid");
      });
    return false; // Validation failed
  }

  document
    .querySelectorAll(`input[name="${radioGroupName}"]`)
    .forEach((radio) => {
      radio.classList.remove("invalid");
    });
  return true; // Validation succeeded
};

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

//Validate inputs
author.addEventListener("input", function (e) {
  handleWordValidation(e.target);
});
name.addEventListener("input", function (e) {
  handleWordValidation(e.target);
});
pages.addEventListener("input", function (e) {
  handleNumberValidation(e.target);
});

//Add book to library and display library on click
buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const isTitleValid = handleWordValidation(name);
  const isAuthorValid = handleWordValidation(author);
  const isPagesValid = handleNumberValidation(pages);
  const yesNoValid = handleRadioValidation("yesNo");

  if (!isAuthorValid || !isTitleValid || !isPagesValid || !yesNoValid) {
    showErrorMessage("Please ensure all fields are filled correctly.");
    return;
  }

  createBook();
  displayMyLibrary();
  clearFields();
  popUp.style.visibility = "hidden";
});

//push new book to myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showErrorMessage(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  // Remove the error message after 3 seconds
  setTimeout(() => {
    hideErrorMessage();
  }, 3000);
}

function hideErrorMessage() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.classList.remove("show");
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

// //function to update indices of the myLibrary books
function updateDataIndices() {
  const elements = document.querySelectorAll("[data-index]");
  i = 0;
  elements.forEach((element, i) => {
    element.closest(".bookCard").setAttribute("data-id", i);
    i++;
  });
}

document.getElementById("container").addEventListener("click", (e) => {
  if (e.target.classList.contains("removeBtn")) {
    const bookIndex = parseInt(e.target.closest(".bookCard").dataset.id);
    elementToRemove = e.target.closest(".bookCard");
    if (elementToRemove) {
      elementToRemove.remove();
    }
    removeBook(bookIndex);
    updateDataIndices();
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
    } else {
      e.target.innerText = "READ";
      e.target.style.backgroundColor = "green";
      e.target.innerHTML = "NOT READ";
      readText.innerText = "yes";
      book.read = "yes";
    }
  }
});
