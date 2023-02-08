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
const bookContainer = document.querySelector('.book-container')

// function that builds HTML elements
function elementFromHtml(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

addBooks.addEventListener('click', () => {
  header.style = 'filter: blur(3px)';
  formContainer.style.cssText = 'display: block';
});

formCloseButton.addEventListener('click', () => {
  header.style = 'filter: blur(0px)';
  formContainer.style.cssText = 'display: none';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookDetails = [];

  // turns the nodeList into an array and adds the values to bookDetails
  [...inputs].forEach((input) => {
    bookDetails.push(input.value);
  });
  // adds the value of the checkbox to bookDetails
  if (checkbox.checked === true) {
    bookDetails.push(true);
  } else bookDetails.push(false);
  // makes new Book object and adds to myLibrary
  myLibrary.push(new Book(...bookDetails));
  let myBook = new Book(...bookDetails);
  // resets form
  form.reset();
  header.style = 'filter: blur(0px)';
  formContainer.style.cssText = 'display: none';

  let graphicBook = elementFromHtml(`
     <div class="card-container">
        <button class="close-button">✖</button>
        <h4>${myBook.title}</h4>
        <div class="author">By: ${myBook.author}</div>
        <div class="pages">Number of pages: ${myBook.pages}</div>
        <div class="language">Language: ${myBook.language}</div>
        <div class="input-container">
          <div>Mark as read: </div>
          <input type="checkbox" id="switch" />
          <label for="switch"></label>
        </div>
      </div>
  `);

  bookContainer.appendChild(graphicBook);
});
