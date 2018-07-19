
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBookToList(new_book){
        const list = document.getElementById('book-list');
        const element = `<tr>
        <td>${new_book['title']}</th>
        <td>${new_book['author']}</td>
        <td>${new_book['isbn']}</td>
        <td><button type="button" class="close" aria-label="Close">
        <span aria-hidden="true" class="close" id="${new_book['isbn']}">&times;</span></button></td></tr>`;
        list.innerHTML += element;
    }
    clearField(){
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
    showAlert(mode, message){
        let created_message = `<div class="alert alert-${mode} mt-2" role="alert">
        ${message}</div>`;
        document.getElementById('alert-container').innerHTML = created_message;
        setTimeout(function(){
                document.querySelector('.alert').remove();
        },3000);
    }
    deleteBook(target){
        if(target.className == 'close'){
                target.parentElement.parentElement.parentElement.remove();
        }
    }
}

//add variables to local storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            //add book to UI
            ui.addBookToList(book);
        });
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// event listener for add
document.getElementById('book-form').addEventListener('submit', function(e){
    // console.log("test");

    // taking values from form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // console.log(title, author, isbn);

    // instatiate a book
    const new_book = new Book(title, author,isbn);

    // console.log(new_book);
    
    // instatiate ui
    const ui = new UI;

    //validate the values
    if(title === "" || author === "" || isbn === ""){
          ui.showAlert("danger", "Please fill in all the fields.");
    }else{
          // add book to the list
          ui.addBookToList(new_book);
          //clear all the form fields
          ui.clearField();
          
          //add to local storage
          Store.addBook(new_book);

          ui.showAlert("success", "Book added successfully.");
    }
    e.preventDefault();   
});

// event listener for remove
document.getElementById('book-list').addEventListener('click',function(e){

    const ui = new UI;
    ui.deleteBook(e.target);

    //remove element from local storage
    Store.removeBook(e.target.id);
    

    ui.showAlert("danger", "Book deleted successfully.");
    
    e.preventDefault();
});