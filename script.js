const main = document.querySelector(".main");
const form = document.querySelector("#book-form");
const dialog = document.querySelector("dialog");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

let books = [];
let shownBooks = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

openBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    dialog.close();

    const book = new Book(form.elements["title"].value, form.elements["author"].value,
                          form.elements["pages"].value, form.elements["read"].checked);
    
    books.push(book)
    displayBooks(books)
})

function displayBooks(books) {
    const div = document.createElement("div");
    div.classList.add("card");

    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    
    title.textContent = "Title: " + books[shownBooks].title;
    author.textContent = "Author: " + books[shownBooks].author;
    pages.textContent = `Pages: ${books[shownBooks].pages}`;
    read.textContent = `Read:  ${books[shownBooks].read}`;
    shownBooks++;
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);

    main.appendChild(div)
}


