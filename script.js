let books = [];

const search = document.querySelector('#search > input');

const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const modal = document.querySelector('#modal');

const bookTitleInput = document.querySelector('input[title="BookTitle"]');
const bookAuthorInput = document.querySelector('input[title="Author"]');
const bookPagesInput = document.querySelector('input[title="Pages"]');
const genres = document.querySelector('#genre');
const wasRead = document.querySelector('input[title="BookRead"]');

const filter = document.querySelector('.radio');
let currentFilter = 'All';

const filterGenres = document.querySelectorAll('input[class="genre"]');
let genresFiltered = [];

let currentBook = '';

function Book(bookTitle, author, pages, genre, completed) {

    if (!new.target){
        throw console.error("You must use the 'new' operator to call the constructor"); 
    }

    this.ID = crypto.randomUUID();
    this.BookTitle = bookTitle;
    this.Author = author;
    this.Pages = pages;
    this.Genre = genre;
    this.Completed = completed;
};

function AddBook(bookTitle, author, pages, genre, completed) {
    const newBook = new Book(bookTitle, author, pages, genre, completed);
    books.push(newBook);

    showBooks(books);
}

function showBooks(passedBooks) {
    const bookDiv = document.querySelector('.books');
    
    const shownBooks = document.querySelectorAll('.book');
    shownBooks.forEach((element) => {
        element.remove();
    });

    passedBooks.forEach((bookObject) => {
        
        const book = document.createElement('div');
        book.className = 'book';

        book.addEventListener("click", () => {
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';

            bookTitleInput.value = bookObject.BookTitle;
            bookAuthorInput.value = bookObject.Author;
            bookPagesInput.value = bookObject.Pages;
            genres.value = bookObject.Genre;
            wasRead.checked = bookObject.Completed;

            save.textContent = 'Save Changes';

            currentBook = bookObject;

            const deleteButton = document.querySelector('.delete');
            deleteButton.style.display = 'inline-block';

            deleteButton.addEventListener("click", () => {
                books = books.filter(bookObj => bookObj.ID !== bookObject.ID);
                modal.style.display = 'none';
                showBooks(books);
            });
        });

        const image = document.createElement('div');
        image.className = 'image';

        image.style.background = `url('assets/books/${bookObject.BookTitle}.jpg')`;
        image.style.backgroundPosition ='center';
        image.style.backgroundSize = 'cover';
        image.style.backgroundRepeat = 'no-repeat';


        book.appendChild(image);

        const information = document.createElement('div');
        information.className = 'information';

        const heading = document.createElement('h1');
        heading.classList.add('title', 'Heading-Font');
        heading.textContent = bookObject.BookTitle;
        information.appendChild(heading);

        const authorText = document.createElement('h2');
        authorText.classList.add('details', 'Body-Font');
        authorText.textContent = bookObject.Author;
        information.appendChild(authorText);

        const pagesText = document.createElement('h3');
        pagesText.classList.add('details', 'Body-Font');
        pagesText.textContent = `${bookObject.Pages} Pages`;
        information.appendChild(pagesText);

        const completedText = document.createElement('h3');
        completedText.classList.add('details', 'Body-Font');

        if (bookObject.Completed){
            completedText.classList.add('read');
            completedText.textContent = 'Read';
        }
        else {
            completedText.classList.add('not-read');
            completedText.textContent = 'Not Read';
        }

        information.appendChild(completedText);

        book.appendChild(information);

        bookDiv.appendChild(book);
    });
}

const addBookButton = document.querySelector('.add');
addBookButton.addEventListener("click", () => {
    
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    const image = document.querySelector('.BookDetails > .image');
    image.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="white"><title>Upload Image</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>`;
    
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookPagesInput.value = '';
    genres.value = 'fiction';
    wasRead.checked = false;

    bookTitleInput.placeholder = 'Enter Book Title Here . . .';
    bookAuthorInput.placeholder = 'Enter Author Here . . .';
    bookPagesInput.placeholder = 'Enter Page Count Here . . .';

    save.textContent = 'Add Book';
});

cancel.addEventListener("click", () => {
    modal.style.display = 'none';
});

save.addEventListener("click", () => {

    if (save.textContent === 'Add Book'){
        
        const selectedGenre = genres.value;

        let bookRead = false;

        if (wasRead.checked){
            bookRead = true;
        }

        AddBook(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, selectedGenre, bookRead);

        modal.style.display = 'none';

        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        bookPagesInput.value = '';
        wasRead.checked = false;
    }
    else {
        currentBook.BookTitle = bookTitleInput.value;
        currentBook.Author = bookAuthorInput.value;
        currentBook.Pages = bookPagesInput.value;
        currentBook.Genre = genres.value;
        currentBook.Completed = wasRead.checked;

        modal.style.display = 'none';
        showBooks(books);
    }
});

search.addEventListener("input", (element) => {
    if (element.target.value.length > 0){
        filterGenres.forEach((element) => {
            if (element.checked){
                element.checked = false;
            }

            element.disabled = true;
        });

        let searchedBook = [];
        books.forEach((book) => {
            let lowerBook = book.BookTitle.toLowerCase();
            let userSearch = element.target.value.toLowerCase();
            if (lowerBook.includes(userSearch)){
                searchedBook.push(book);
            }
        });
        showBooks(searchedBook);
    }
    else {
        showBooks(books);
    }
});

filter.addEventListener("change", (event) => {
    if (event.target.id === "All"){

        search.disabled = false;

        filterGenres.forEach((element) => {
            element.disabled = false;
        });

        showBooks(books);
    }
    else if (event.target.id === "Read"){

        search.disabled = true;

        filterGenres.forEach((element) => {
            element.disabled = true;
        });

        const readBooks = [];

        books.forEach((element) => {
            if (element.Completed){
                readBooks.push(element);
            }
        });

        showBooks(readBooks);
    }
    else {

        search.disabled = true;

        filterGenres.forEach((element) => {
            element.disabled = true;
        });

        const unreadBooks = [];

        books.forEach((element) => {
            if (!element.Completed && !element.Completed){
                unreadBooks.push(element);
            }
        });

        showBooks(unreadBooks);
    }
});


filterGenres.forEach((element) => {
    element.addEventListener("change", () => {
        if (element.checked){
            genresFiltered.push(element.value);
        }
        else {
            genresFiltered = genresFiltered.filter(theGenre => theGenre !== element.value);
        }

        let filteredBooks = getFilteredBookByGenre();

        if (filteredBooks.length === 0){
            showBooks(books);
        }
        else {
            showBooks(filteredBooks);
        }
    });
});

function getFilteredBookByGenre(){
    let filteredBooks = [];

    genresFiltered.forEach((type) => {
        books.forEach((element) => {
            if (element.Genre === type){
                if (!filteredBooks.includes(element)){
                    filteredBooks.push(element);
                }
            }
        });
    });

    return filteredBooks;
}