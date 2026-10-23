//-----Save a favourite colour in localStorage
localStorage.setItem("favouriteColour", "Blue");
console.log("Favourite Colour:", localStorage.getItem("favouriteColour"));

//----Save a temporary step number in sessionStorage
sessionStorage.setItem("stepNumber", "2");
console.log("Current Step:", sessionStorage.getItem("stepNumber"));

//----Store three book titles as an array
const bookTitles = ["Wings of Fire", "The Alchemist", "Atomic Habits"];
localStorage.setItem("books", JSON.stringify(bookTitles));

//-----Read and print the book titles
const books = JSON.parse(localStorage.getItem("books"));
console.log("Book Titles:");
books.forEach(function(book) {
    console.log(book);
});
