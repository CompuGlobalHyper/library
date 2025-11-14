function Books (name, author) {
    this.name = name
    this.author = author
    this.read = false

}

Books.prototype.isRead = function() {
    this.read = !this.read
}

let bookOne = new Books("Fake Book", "You")
let bookTwo = new Books("Defintely Real Book", "Me")

const library = [bookOne, bookTwo]

let bookThree = new Books("Favorite Book", "Me")
let bookFour = new Books("How to Code", "World's Best Programmer")

const bookBag = [bookThree, bookFour]

function giveBookId (array){
    for (let element of array) {
        element.id = crypto.randomUUID()
    }
}

function logBook(name, author) {
    const book = new Books(name, author)
    book.id = crypto.randomUUID()
    library.push(book)
    return book
}


const libraryContainer = document.querySelector('div.library-container')
const basketContainer = document.querySelector('div.basket-container')

giveBookId(library)
giveBookId(bookBag)

for (let element of library) {
    createBookBubble(element, libraryContainer, 'Add to basket')
}
for (let element of bookBag) {
    createBookBubble(element, basketContainer, 'Return to library')
}

function createBookBubble(object, container, string) {
    let bookBubble = document.createElement('div')
    

    let bookText = document.createElement('p')
    bookText.textContent = `"${object.name}" by ${object.author}`
    bookBubble.appendChild(bookText)
    bookBubble.classList.add('bookBubble')

    let bookButton = document.createElement('button')
    bookButton.classList.add('bookButton')

    
    bookButton.textContent = string
    bookButton.setAttribute('data-id', object.id)
    bookBubble.id = object.id

    let checkRead = document.createElement('input')
    checkRead.type = 'checkbox'
    checkRead.classList.add('checkRead')
    checkRead.id = 'check-read'
    let readLabel = document.createElement('label')
    readLabel.htmlFor = 'check-read'
    readLabel.textContent = 'Already read?'

    checkRead.addEventListener('click', () => {
        object.isRead()
    })

    if (object.read) {
        checkRead.checked = true;
    }

    let optionsContainer = document.createElement('div')
    optionsContainer.classList.add('optionsContainer')

    bookBubble.appendChild(optionsContainer)

    optionsContainer.appendChild(bookButton)
    optionsContainer.appendChild(readLabel)
    optionsContainer.appendChild(checkRead)


    container.appendChild(bookBubble)
}

const dialog = document.querySelector('dialog')
const prideButton = document.querySelector('button.pride-button')
const closePrideButton = document.querySelector('dialog button')

document.addEventListener('click', function(event) {
    const target = event.target
    if (target.classList.contains('add-book-button')) {
        event.preventDefault()
        const name = document.getElementById('bookname').value
        const author = document.getElementById('authorname').value
        const textArea = document.getElementById('comment').value

        const nameClear = document.getElementById('bookname')
        const authorClear = document.getElementById('authorname')
        const textAreaClear = document.getElementById('comment')
        if (!name || !author) return
        
        let book = logBook(name, author)
        createBookBubble(book, libraryContainer, 'Add to basket')

        nameClear.value = '';
        authorClear.value = '';
        textAreaClear.value = '';
        return
    }
    if (target.classList.contains('bookButton')) {
        let id = target.getAttribute('data-id')
        document.getElementById(id).remove()
        for (let element of library) {
            if (element.id === id) {
                bookBag.push(...library.splice(library.indexOf(element), 1))
                createBookBubble(element, basketContainer, 'Return to library')
                return
            }
        }
        for (let element of bookBag) {
            if (element.id === id) {
                library.push(...bookBag.splice(bookBag.indexOf(element), 1))
                createBookBubble(element, libraryContainer, 'Add to basket')
                return
            }
        }
    }
    if (target.classList.contains('pride-button')) {
        event.preventDefault()
        dialog.showModal()
    }
})

closePrideButton.addEventListener('click', () => {
    dialog.close()
})


