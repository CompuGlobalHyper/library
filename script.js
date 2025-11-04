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
        console.log(`${element.name} by ${element.author}`)
    }
}

displayBooks(library)