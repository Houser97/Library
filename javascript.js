const containerForm = document.querySelector('.popup_form');
let author = document.getElementById('author').value;
let title = document.getElementById('title').value;
let pagesNumber = document.getElementById('pages').value;

/*---------- Funciones --------*/

function openForm(e) {
    containerForm.style.display = 'flex';
}

function closeForm(e) {
    containerForm.style.display = 'none';
}

function collectDataForm(e) {
    e.preventDefault();

    /*---------- Select inputs --------- */
    author = document.getElementById('author').value;
    title = document.getElementById('title').value;
    pagesNumber = document.getElementById('pages').value;
    console.log(author);
    console.log(title);
    console.log(pagesNumber);
}


const addNewBook = document.querySelector('.add_book');
addNewBook.addEventListener('click', openForm);

const closeButtonForm = document.querySelector('.close');
closeButtonForm.addEventListener('click', closeForm);

const form = document.getElementById('form');
form.addEventListener('submit', collectDataForm);