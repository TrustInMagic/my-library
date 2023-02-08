let myLibrary = [];

function Book(title, author, pages, language, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language
  this.read = read;
  this.info = function () {
    const readStatement = read ? 'already read' : 'not read yet';
    return `${title} by ${author}, ${pages} pages, ${readStatement}`;
  };
}

const addBooks = document.querySelector('.add-book button');
const header = document.querySelector('.header');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('form');

addBooks.addEventListener('click', () => {
  header.style = "filter: blur(3px)";
  formContainer.style.cssText = "display: block; ";
  
})

