
// book constructor

function Book(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
}

// ui constructor

function UI(){}

UI.prototype.addBookToList = function(new_book){
      // console.log(new_book);

      const list = document.getElementById('book-list');
      const element = `<tr>
      <td>${new_book['title']}</th>
      <td>${new_book['author']}</td>
      <td>${new_book['isbn']}</td>
      <td><button type="button" class="close" aria-label="Close">
      <span aria-hidden="true" class="close">&times;</span></button></td></tr>`;
      list.innerHTML += element;
}
UI.prototype.clearField = function(){
      document.getElementById('title').value = "";
      document.getElementById('author').value = "";
      document.getElementById('isbn').value = "";
}
UI.prototype.showAlert = function(mode,message){
      // alert-container
      created_message = `<div class="alert alert-${mode} mt-2" role="alert">
      ${message}</div>`;
      document.getElementById('alert-container').innerHTML = created_message;
      setTimeout(function(){
            document.querySelector('.alert').remove();
      },3000);
}
UI.prototype.deleteBook = function(target){
      if(target.className == 'close'){
            target.parentElement.parentElement.parentElement.remove();
      }
}

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
            ui.showAlert("success", "Book added successfully.");
      }
      e.preventDefault();   
});

// event listener for remove
document.getElementById('book-list').addEventListener('click',function(e){

      const ui = new UI;
      ui.deleteBook(e.target);
      ui.showAlert("danger", "Book deleted successfully.");
      
      e.preventDefault();
});