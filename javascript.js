const containerForm = document.querySelector('.popup_form');

function openForm(e) {
    containerForm.style.display = 'flex';
}

function closeForm(e) {
    containerForm.style.display = 'none';
}

const addNewBook = document.querySelector('.add_book');
addNewBook.addEventListener('click', openForm);

const closeButtonForm = document.querySelector('.close');
closeButtonForm.addEventListener('click', closeForm);