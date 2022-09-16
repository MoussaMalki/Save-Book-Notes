/////////////////////////////////////// =====> I - Adding Books to the list /////////////////////////////////////////
//// ====> 1. getting values out of the inputs

let doc = document;
let log = console.log;

let titleInput = doc.querySelector(`#title-inp`);
let authorInput = doc.querySelector(`#author-inp`);
let notesInput = doc.querySelector(`#notes-inp`);
let addBookBtn = doc.querySelector(`#add-book`);
let booksList = doc.querySelector(`.book-cards`);

class Book {
  constructor(title, author, notes) {
    this.title = title;
    this.author = author;
    this.notes = notes;
  }
  createBook() {
    let div = doc.createElement(`div`);
    div.setAttribute(`name`, `${this.title}`);
    booksList.appendChild(div);

    div.innerHTML = ` <span id="book-card-title">${this.title}</span>
    by
    <span id="book-card-author">${this.author}</span>
    `;

    div.setAttribute(`text`, `${this.notes}`);
    let openBtn = doc.createElement(`i`);
    openBtn.className = `bx bxs-book-open`;
    openBtn.setAttribute(`name`, `open-book`);
    let deleteBtn = doc.createElement(`i`);
    deleteBtn.className = `bx bx-x-circle`;
    deleteBtn.setAttribute(`name`, `delete-book`);

    div.appendChild(openBtn);
    div.appendChild(deleteBtn);

    openBtn.onclick = () => {
      let div = doc.createElement(`div`);
      div.id = `opened-book`;
      doc.body.appendChild(div);
      div.innerHTML = ` <h2>${this.title}</h2>
      <h6>by <span>${this.author}</span></h6>
      <p> ${this.notes}</p>`;
      let xIcon = doc.createElement(`i`);
      xIcon.className = `bx bx-x`;
      xIcon.id = `#delete-openedBook`;
      div.appendChild(xIcon);

      xIcon.onclick = () => {
        xIcon.parentElement.remove();
      };
    };
    deleteBtn.onclick = () => {
      deleteBtn.parentElement.remove();
    };
  }
  static search() {
    setInterval(() => {
      let inputValue = doc.querySelector(`#search-inp`).value;
      let divValue = doc.querySelector(`.book-cards`).children;

      divValue.length !== 0
        ? Array.from(divValue).forEach((e) => {
            new RegExp(`${inputValue}`, `gi`).test(e.getAttribute(`name`)) ===
            true
              ? (e.style.cssText = `display: block`)
              : (e.style.cssText = `display: none`);
          })
        : `no`;
    }, 100);
  }
}

function getFieldsValue() {
  globalThis.titleInputValue = `title`;
  globalThis.authorInputValue = `author`;
  globalThis.notesInputValue = `empty`;

  titleInput.onblur = () => {
    globalThis.titleInputValue = titleInput.value;
  };
  authorInput.onblur = () => {
    globalThis.authorInputValue = authorInput.value;
  };
  notesInput.onblur = () => {
    globalThis.notesInputValue = notesInput.value;
  };
  addBookBtn.onclick = () => {
    globalThis.book = new Book(
      titleInputValue || `title`,
      authorInputValue || `unknown`,
      notesInputValue || `empty notes`
    );
    book.createBook();
  };
}
getFieldsValue();
Book.search();

setInterval(() => {
  localStorage.setItem(`bookList`, `${booksList.innerHTML}`);
}, 100);

if (localStorage.getItem(`bookList`) !== null) {
  booksList.innerHTML = localStorage.getItem(`bookList`);

  Array.from(booksList.children).forEach((e) => {
    log(e.childNodes);

    e.childNodes[6].addEventListener(`click`, () => {
      e.remove();
    });
    e.childNodes[5].addEventListener(`click`, () => {
      let div = doc.createElement(`div`);
      div.id = `opened-book`;
      doc.body.appendChild(div);
      div.innerHTML = ` <h2>${e.childNodes[1].textContent}</h2>
      <h6>by <span>${e.childNodes[3].textContent}</span></h6>
      <p> ${e.getAttribute(`text`)}</p>`;
      let xIcon = doc.createElement(`i`);
      xIcon.className = `bx bx-x`;
      xIcon.id = `#delete-openedBook`;
      div.appendChild(xIcon);

      xIcon.onclick = () => {
        xIcon.parentElement.remove();
      };
    });
  });

  // doc.querySelector(`[name="open-book"]`).onclick = () => {
  //   let div = doc.createElement(`div`);
  //   div.id = `opened-book`;
  //   doc.body.appendChild(div);
  //   div.innerHTML = ` <h2>${
  //     doc.querySelector(`#book-card-title`).textContent
  //   }</h2>
  //   <h6>by <span>${
  //     doc.querySelector(`#book-card-author`).textContent
  //   }</span></h6>
  //   <p>${doc
  //     .querySelector(`[name="open-book"]`)
  //     .parentElement.getAttribute(`text`)}</p>`;
  //   let xIcon = doc.createElement(`i`);
  //   xIcon.className = `bx bx-x`;
  //   xIcon.id = `#delete-openedBook`;
  //   div.appendChild(xIcon);

  //   xIcon.onclick = () => {
  //     xIcon.parentElement.remove();
  //   };
  // };
}
//// 1. make the list scrollable (done)
/// 2. open up book function (done)
/// 3. search bar (done)
/// 4. local storage
