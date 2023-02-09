const myLibrary = [];

function Book(title, author, pages, language, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.read = read;
}

const addBooks = document.querySelector('.add-book button');
const header = document.querySelector('.header');
const formContainer = document.querySelector('.form-container');
const formCloseButton = document.querySelector('.close-button');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('[type="text"], [type="number"]');
const checkbox = document.querySelector('[type="checkbox"]');
const bookContainer = document.querySelector('.book-container');
const body = document.querySelector('body');
const totalBooksCount = document.querySelector('.total-books-count');
const booksRead = document.querySelector('.read');
const notRead = document.querySelector('.not-read');
const button = document.querySelector('button');

// function that builds HTML elements
function elementFromHtml(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

function addBookDomElement(e) {
  e.preventDefault();
  const bookDetails = [];

  // turns the nodeList into an array and adds the values to bookDetails
  [...inputs].forEach((input) => {
    bookDetails.push(input.value);
  });
  // I am using markRead variable to add checked or unchecked status on the toggle switch from the book DOM element (read/not read)
  // I am using readStatusColor variable to toggle the background color of the book DOM element
  let markRead;
  let readStatusColor;
  if (checkbox.checked === true) {
    bookDetails.push(true);
    markRead = 'checked="true"';
    readStatusColor =
      'background-image: linear-gradient(to right, #134e5e, #71b280)';
  } else {
    bookDetails.push(false);
    markRead = '';
    readStatusColor =
      'background-image: linear-gradient(to right, #304352, #d7d2cc)';
  }
  // makes new Book object and adds to myLibrary
  myLibrary.push(new Book(...bookDetails));
  const myBook = new Book(...bookDetails);
  // resets form and clears it from DOM
  form.reset();
  header.style = 'filter: blur(0px)';
  formContainer.style.cssText = 'display: none';
  // adds the book element to the DOM
  const graphicBook = elementFromHtml(`
     <div class="card-container" style='${readStatusColor}' data-number='${myLibrary.length}'>
        <button class="close-button">✖</button>
        <h4>${myBook.title}</h4>
        <div class="author">By: ${myBook.author}</div>
        <div class="pages">Number of pages: ${myBook.pages}</div>
        <div class="language">Language: ${myBook.language}</div>
        <div class="input-container">
          <div>Mark as read: </div>
          <input type="checkbox" id="switch${myLibrary.length}" ${markRead}/>
          <label for="switch${myLibrary.length}"></label>
        </div>
      </div>
  `);

  bookContainer.insertBefore(graphicBook, bookContainer.firstChild);

  const cardContainer = document.querySelector('.card-container');
  const cardCloseButton = document.querySelector('.card-container button');

  cardCloseButton.addEventListener('click', (buttonEvent) => {
    const bookToDelete = buttonEvent.target.parentNode;
    bookContainer.removeChild(bookToDelete);
    // removes the corresponding book object from myLibrary
    myLibrary.splice(cardContainer.getAttribute('data-number') - 1, 1);
  });

  const readToggle = document.querySelector('.card-container input');
  readToggle.addEventListener('click', (buttonEvent) => {
    // using data-number attribute (that is linked to myLibrary index of the books) to change the 'read or 'not read' status in myLibrary
    const bookToEditDom = buttonEvent.target.parentNode.parentNode;
    const bookToEditInLibrary =
      myLibrary[bookToEditDom.getAttribute('data-number') - 1];
    // changes to color of the book DOM element corresponding to the 'read' or 'not read' status and the status from myLibrary
    if (readToggle.checked === false) {
      bookToEditInLibrary.read = !bookToEditInLibrary.read;
      cardContainer.style.cssText =
        'background-image: linear-gradient(to right, #304352, #d7d2cc)';
    } else {
      bookToEditInLibrary.read = !bookToEditInLibrary.read;
      cardContainer.style.cssText =
        'background-image: linear-gradient(to right, #134e5e, #71b280)';
    }
  });
}

function updateLog() {
  const totalBookCount = myLibrary.length;
  let totalBooksRead = 0;
  myLibrary.forEach((book) => {
    if (book.read === true) totalBooksRead += 1;
  });
  const totalBooksNotRead = totalBookCount - totalBooksRead;

  return [totalBookCount, totalBooksRead, totalBooksNotRead];
}

addBooks.addEventListener('click', () => {
  header.style = 'filter: blur(3px)';
  formContainer.style.cssText = 'display: block';
});

formCloseButton.addEventListener('click', () => {
  header.style = 'filter: blur(0px)';
  formContainer.style.cssText = 'display: none';
});

form.addEventListener('submit', (e) => addBookDomElement(e));

[body, button].forEach(element => element.addEventListener('click', () => {
  const logStatus = updateLog();
  console.log(logStatus);
  console.log(myLibrary)
  totalBooksCount.innerHTML = logStatus[0];
  booksRead.innerHTML = logStatus[1];
  notRead.innerHTML = logStatus[2];
}));
