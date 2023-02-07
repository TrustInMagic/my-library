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
const popUpContainer = document.createElement('div');
popUpContainer.classList.add('pop-up-container');
const header = document.querySelector('.header');

addBooks.addEventListener('click', () => {
  header.style = "filter: blur(3px)";
  document.body.insertBefore(popUpContainer, header);
})

