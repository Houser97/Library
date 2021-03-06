import { saveBook, getBooks, getProfilePicUrl, getUserName } from "./firebase.js";

const containerForm = document.querySelector('.popup_form');
let author = document.getElementById('author').value;
let title = document.getElementById('title').value;
let pagesNumber = document.getElementById('pages').value;
const containerBooks = document.querySelector('.container');
let radioButtonYes = document.getElementById('yes');
let radioButtonNo = document.getElementById('no');
let readButton = 0;
let removeButton = 0;
let contadorLibro = 0;

let myLibrary = [];

/*---------- Funciones --------*/

function openForm(e) {
    containerForm.style.display = 'flex';
}

function closeForm(e) {
    containerForm.style.display = 'none';
}

function eraseBook(e) {
    let clase = this.classList[1];
    let parentDOM = document.getElementById(`${clase}`);

    parentDOM.innerHTML='';
    parentDOM.remove();

}

function eraseBook2(book) {
    let clase = book.classList[1];
    let parentDOM = document.getElementById(`${clase}`);

    parentDOM.innerHTML='';
    parentDOM.remove();

}

function Book(titleBook, authorBook, Pages) {
    this.nameAuthor = authorBook;
    this.titleB = titleBook;
    this.pages = Pages;
}



function createBook(bookList,radioButton){
    let divsList = [];
    let classes = ['book','test','title','author','pages','botones','read','remove'];
    
    for(let i = 0; i<=7; i++){
        if(i>5){
            divsList[i] = document.createElement('button');
        } else {
            divsList[i] = document.createElement('div');
        }
    }

    for(let i = 0; i<=7; i++){
        if(i>5){
            divsList[i].classList.add(classes[i]); ;
        } else {
            divsList[i].classList.add(classes[i]);;
        }
    }

    
    if(radioButton.id == 'yes' || radioButton === true){
        divsList[6].removeAttribute('class');
        divsList[6].classList.add('read');
        divsList[6].textContent = 'Read'
    } else if(radioButton.id == 'no' ||radioButton === false) {
        divsList[6].removeAttribute('class');
        divsList[6].classList.add('noread');
        divsList[6].textContent = 'Not Read'
    } 


    /*Botones*/
    divsList[7].textContent = 'Remove';
    divsList[7].classList.add(`${contadorLibro}`);
    /*console.log( divsList[7]);*/
    divsList[5].appendChild(divsList[6]);
    divsList[5].appendChild(divsList[7])
    /* primera parte */
    divsList[4].textContent = myLibrary[contadorLibro].pages+' pages';
    divsList[3].textContent = 'By: ' + myLibrary[contadorLibro].nameAuthor;
    divsList[2].textContent = myLibrary[contadorLibro].titleB;
    divsList[1].appendChild(divsList[2]); /* primero el titulo, sino quedaria hasta abajo*/
    divsList[1].appendChild(divsList[3]);
    divsList[1].appendChild(divsList[4]);
    divsList[0].id=`${contadorLibro}`;
    divsList[0].appendChild(divsList[1]); /* Se agrega la primera seccion al DIV BOOK */
    divsList[0].appendChild(divsList[5]); /* Se agregan los botones al DIV BOOK */
    containerBooks.appendChild(divsList[0]); /* Se agrega todo al DIV CONTAINER*/
    contadorLibro += 1;
    let readButton = divsList[6];
    removeButton = divsList[7];
    removeButton.addEventListener('click', eraseBook);
    readButton.addEventListener('click', changeRead); /*Retorna el boton READ a crear para poder usar EVENT LISTENER*/ 
}

function collectDataForm(e) {
    closeForm();
    e.preventDefault();
    /*---------- Select inputs --------- */
    author = document.getElementById('author').value;
    title = document.getElementById('title').value;
    pagesNumber = document.getElementById('pages').value;
    let radioButton = document.querySelector('input[type="radio"]:checked');

    /*console.log(radioButton);*/
    /* firebase section */
    let isRead = (radioButton.id === "yes") ? true : false;
    saveBook(author, title, pagesNumber, isRead);
    
    /* ------- */

    /*----------- Crear instancia de libro------- */
    const book = new Book(title, author, pagesNumber);
    myLibrary.push(book);
    /*console.log(myLibrary);*/
    createBook(myLibrary,radioButton);
}


function changeRead(e) {
    if(this.classList[0] == 'read'){
        this.removeAttribute('class');
        this.classList.add('noread');
        this.textContent = 'Not Read'
    } else {
        this.removeAttribute('class');
        this.classList.add('read');
        this.textContent = 'Read'
    }

}





const addNewBook = document.querySelector('.add_book');
addNewBook.addEventListener('click', openForm);

const closeButtonForm = document.querySelector('.close');
closeButtonForm.addEventListener('click', closeForm);

const form = document.getElementById('form');
form.addEventListener('submit', collectDataForm);

/* Firebase section */
window.addEventListener("DOMContentLoaded", async () => {
    let querySnapshot = await getBooks();
    if (querySnapshot !== undefined)
{    querySnapshot.forEach(doc => {
        doc = doc.data();
        let authorDB = doc.author;
        let title = doc.title;
        let pages = doc.NumPages;
        let isRead = doc.isRead;

            /*----------- Crear instancia de libro------- */
        const book = new Book(title, authorDB, pages);
        myLibrary.push(book);
        /*console.log(myLibrary);*/
        createBook(myLibrary,isRead);
    });
}
})

/* Auth */
import { signIn } from "./firebase.js";
const buttonSign = document.querySelector(".sign-up");
buttonSign.addEventListener("click", async () => {
    await signIn()
    const pictureURL = await getProfilePicUrl();
    const nameUser = await getUserName();

    const buttons = document.querySelector(".buttons-fb");
    const userData = document.querySelector("#user-data");

    buttons.style.display = "none";
    userData.style.display = "flex";

    const userPicture = document.querySelector(".user-photo");
    userPicture.src = pictureURL;

    const userName = document.querySelector(".user-name");
    userName.textContent = nameUser;


    const books = document.querySelectorAll(".book");
    books.forEach(book => book.remove());

    let querySnapshot = await getBooks();
    if (querySnapshot !== undefined)
{    querySnapshot.forEach(doc => {
        doc = doc.data();
        let authorDB = doc.author;
        let title = doc.title;
        let pages = doc.NumPages;
        let isRead = doc.isRead;

            /*----------- Crear instancia de libro------- */
        const book = new Book(title, authorDB, pages);
        myLibrary.push(book);
        /*console.log(myLibrary);*/
        createBook(myLibrary,isRead);
    });
}   
});

/* Sign out */
import { signOutUser } from "./firebase.js";
const signOutButton = document.querySelector(".log-out");
signOutButton.addEventListener("click", async () => {
    await signOutUser();
    const buttons = document.querySelector(".buttons-fb");
    const userData = document.querySelector("#user-data");

    buttons.style.display = "flex";
    userData.style.display = "none";

    const books = document.querySelectorAll(".book");
    books.forEach(book => book.remove());

    let querySnapshot = await getBooks();
    if (querySnapshot !== undefined)
{    querySnapshot.forEach(doc => {
        doc = doc.data();
        let authorDB = doc.author;
        let title = doc.title;
        let pages = doc.NumPages;
        let isRead = doc.isRead;

            /*----------- Crear instancia de libro------- */
        const book = new Book(title, authorDB, pages);
        myLibrary.push(book);
        /*console.log(myLibrary);*/
        createBook(myLibrary,isRead);
    });
}   

})
