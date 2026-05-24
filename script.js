const books = [];

const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const modal = document.querySelector('#modal');

const bookTitleInput = document.querySelector('input[title="BookTitle"]');
const bookAuthorInput = document.querySelector('input[title="Author"]');
const bookPagesInput = document.querySelector('input[title="Pages"]');

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
    console.log(newBook);
    books.push(newBook);
    console.log(books);

    showBooks();
}

function showBooks() {
    const bookDiv = document.querySelector('.books');
    
    const shownBooks = document.querySelectorAll('.book');
    shownBooks.forEach((element) => {
        element.remove();
    });

    books.forEach((bookObject) => {
        
        const book = document.createElement('div');
        book.className = 'book';

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
    
    
    bookTitleInput.placeholder = 'Enter Book Title Here . . .';

    
    bookAuthorInput.placeholder = 'Enter Author Here . . .';

    
    bookPagesInput.placeholder = 'Enter Page Count Here . . .';

    save.textContent = 'Add Book';
});

cancel.addEventListener("click", () => {
    modal.style.display = 'none';
});

save.addEventListener("click", () => {
    const genres = document.querySelector('#genre');
    const selectedGenre = genres.value;

    const wasRead = document.querySelector('input[title="BookRead"]');
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
});

