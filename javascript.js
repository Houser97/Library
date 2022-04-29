const containerForm = document.querySelector('.popup_form');
let author = document.getElementById('author').value;
let title = document.getElementById('title').value;
let pagesNumber = document.getElementById('pages').value;
const containerBooks = document.querySelector('.container');
let contadorLibro = 0;

let myLibrary = [];

/*---------- Funciones --------*/

function openForm(e) {
    containerForm.style.display = 'flex';
}

function closeForm(e) {
    containerForm.style.display = 'none';
}

function Book(titleBook, authorBook, Pages) {
    this.nameAuthor = authorBook;
    this.titleB = titleBook;
    this.pages = Pages;
}

function createBook(bookList){
    let divsList = [];
    let classes = ['book','test','title','author','pages','botones','read','remove'];
    
    for(i = 0; i<=7; i++){
        if(i>5){
            divsList[i] = document.createElement('button');
        } else {
            divsList[i] = document.createElement('div');
        }
    }

    for(i = 0; i<=7; i++){
        if(i>5){
            divsList[i].classList.add(classes[i]); ;
        } else {
            divsList[i].classList.add(classes[i]);;
        }
    }

    /*Botones*/
    divsList[7].textContent = 'Remove';
    divsList[6].textContent = 'Read';
    divsList[5].appendChild(divsList[6]);
    divsList[5].appendChild(divsList[7])
    /* primera parte */
    divsList[4].textContent = myLibrary[contadorLibro].pages+' pages';
    divsList[3].textContent = myLibrary[contadorLibro].nameAuthor;
    divsList[2].textContent = myLibrary[contadorLibro].titleB;
    divsList[1].appendChild(divsList[2]); /* primero el titulo, sino quedaria hasta abajo*/
    divsList[1].appendChild(divsList[3]);
    divsList[1].appendChild(divsList[4]);
    divsList[0].appendChild(divsList[1]); /* Se agrega la primera seccion al DIV BOOK */
    divsList[0].appendChild(divsList[5]); /* Se agregan los botones al DIV BOOK */
    containerBooks.appendChild(divsList[0]); /* Se agrega todo al DIV CONTAINER*/
    contadorLibro += 1;
}

function collectDataForm(e) {
    e.preventDefault();
    /*---------- Select inputs --------- */
    author = document.getElementById('author').value;
    title = document.getElementById('title').value;
    pagesNumber = document.getElementById('pages').value;

    /*----------- Crear instancia de libro------- */
    const book = new Book(title, author, pagesNumber);
    myLibrary.push(book);
    console.log(myLibrary);
    createBook(myLibrary);
}


const addNewBook = document.querySelector('.add_book');
addNewBook.addEventListener('click', openForm);

const closeButtonForm = document.querySelector('.close');
closeButtonForm.addEventListener('click', closeForm);

const form = document.getElementById('form');
form.addEventListener('submit', collectDataForm);