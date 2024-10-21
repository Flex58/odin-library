const main = document.querySelector(".main");
const form = document.querySelector("#book-form");
const inputs = document.querySelectorAll("input")
const dialog = document.querySelector("dialog");
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector("#close");

let books = [];

class Book{
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

openBtn.addEventListener("click", () => {
    dialog.showModal();
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})

inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.validity.valueMissing) {
            input.setCustomValidity("Please fill out this field")
            input.reportValidity()
        }
        else {
            input.setCustomValidity("")
            input.reportValidity()
        }
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    if (form.elements["title"].validity.valueMissing || form.elements["author"].validity.valueMissing|| form.elements["pages"].validity.valueMissing) {
        for (let i = 0; i < form.elements.length - 1; i++) {
            if (form.elements[i].validity.valueMissing) {
                form.elements[i].setCustomValidity("Please fill out this field")
                form.elements[i].reportValidity()
            }
            else {
                form.elements[i].setCustomValidity("")
                form.elements[i].reportValidity()
            }
        }
    }
    else {
        for (let i = 0; i < form.elements.length - 1; i++) {
            form.elements[i].setCustomValidity("")
        }
        dialog.close();

        const book = new Book(form.elements["title"].value, form.elements["author"].value,
                          form.elements["pages"].value, form.elements["read"].checked);
        
        
        books.push(book)
        displayBooks(books)
    }
    
    
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
        if (books[i].read) {
            switchBtn.style.backgroundColor = "#16a34a"
            switchBtn.textContent ="Read";
        }
        else {
            switchBtn.style.backgroundColor = "#ef4444"
            switchBtn.textContent ="Not Read";
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
            switchBtn.style.backgroundColor = "#ef4444"
            switchBtn.textContent ="Not Read";
        }
        else {
            books[switchBtn.parentElement.id].read = true;
            switchBtn.style.backgroundColor = "#16a34a"
            switchBtn.textContent ="Read";
        }
    })
}
