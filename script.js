const library = [
    {name: "Fake Book", author: "You"}, 
    {name: "Defintely Real Book", author: "Me" }
]

function Books (name, author) {
    this.name = name
    this.author = author

}

function logBook(name, author) {
    const book = new Books(name, author)
    book.id = crypto.randomUUID()
    library.push(book)
}

function displayBooks(array) {
    for (let element of array) {
        createBookBubble(element)
        //console.log(element.id)
    }
}

const libraryContainer = document.querySelector('div.library-container')
function createBookBubble(object) {
    let bookBubble = document.createElement('div')
    bookBubble.classList.add('bookBubble')

    let bookText = document.createElement('p')
    bookText.textContent = `"${object.name}" by ${object.author}`
    bookBubble.appendChild(bookText)

    let bookButton = document.createElement('button')
    bookButton.classList.add('bookButton')
    bookButton.textContent = 'Add to basket'
    bookBubble.appendChild(bookButton)

    libraryContainer.appendChild(bookBubble)
}

displayBooks(library)