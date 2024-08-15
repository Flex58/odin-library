const main = document.querySelector(".main");
const form = document.querySelector("#book-form");
const dialog = document.querySelector("dialog");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

let books = [];

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
    const deleteBtn = document.createElement("button");
    const switchBtn = document.createElement("button");
    
    for (i in books) {
        
        title.textContent = books[i].title[0].toUpperCase() + books[i].title.slice(1);
        author.textContent = "Author: " + books[i].author;
        pages.textContent = `Pages: ${books[i].pages}`;
        deleteBtn.textContent = "X";
        deleteBtn.value = i;
        switchBtn.textContent ="Read";
        if (books[i].read) {
            switchBtn.style.backgroundColor = "green"
        }
        else {
            switchBtn.style.backgroundColor = "red"
        }
        div.setAttribute("id", i)

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        div.appendChild(switchBtn);
        div.appendChild(deleteBtn);

        
    }
    main.appendChild(div)
    
    deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.remove();
    }) 

    switchBtn.addEventListener("click", () => {
        if (books[switchBtn.parentElement.id].read) {
            books[switchBtn.parentElement.id].read = false;
            switchBtn.style.backgroundColor = "red"
        }
        else {
            books[switchBtn.parentElement.id].read = true;
            switchBtn.style.backgroundColor = "green"
        }
    })
}
