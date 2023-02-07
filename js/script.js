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
const addNewBook = document.createElement('div');
addNewBook.classList.add('add-new-book');

addBooks.addEventListener('click', () => {
  document.body.style = "filter: blur(3px)";
  
})

