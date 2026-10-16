/*----basic javascript----*/

//----print your name, course and number
console.log("Name:Nithyasree");
console.log("Course:CSBS");
console.log("Number:10");

//----variable
let eventName = "Cultural";
let ticketPrice = 100;
let availableTickets = 50;
console.log("Event Name",eventName);
console.log("Ticket Price:", ticketPrice);
console.log("Available Tickets:", availableTickets);

//-----total price
let totalPrice = ticketPrice * 3;
console.log("Total Price:", totalPrice);
if(totalPrice > 200){
    console.log("You have exceeded the budget");
}else{
    console.log("Total does not exceed 200");
}

//-----number is postive, zero or negative
let number = 5;
if (number > 0) {
    console.log("The number is positive");
} else if (number = 0) {
    console.log("The number is zero");
} else {
    console.log("The number is negative");
}

//-----print the even numbers
for(let i=1; i<=10; i++){
    if(i % 2 == 0){
        console.log(i);
    }
}
/*-----functions and arrays-----*/

//----calculate total price
function calculateTotalPrice(price, quantity) {
    return price * quantity;
}
console.log(calculateTotal(100, 3));

//------name and greeeting
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("Nithyasree");

//-----Array of five event names and len

let events = ["Cultural", "Sports", "Music", "Art", "Dance"];

console.log("Events:", events);
console.log("Number of events:", events.length);

//----- Filter

let numbers = [5, 12, 8, 20, 15];

let filteredNumbers = numbers.filter(function(num) {
    return num > 10;
});

console.log("Filtered numbers:", filteredNumbers);

//----- Map

let values = [2, 4, 6, 8, 10];

let doubled = values.map(function(num) {
    return num * 2;
});

console.log("Doubled numbers:", doubled);

//---- Reduce

let prices = [20, 30, 40];

let total = prices.reduce(function(sum, price) {
    return sum + price;
}, 0);

console.log("Total:", total);

//----total price

function calculateTotal(price, quantity) {
    return price * quantity;
}

console.log("Ticket total:", calculateTotal(100, 3));

//-----original array
let original = [20, 30, 40];

let filtered = original.filter(function(num) {
    return num > 20;
});

let mapped = original.map(function(num) {
    return num * 2;
});

let reduced = original.reduce(function(sum, num) {
    return sum + num;
}, 0);

console.log("Filtered array:", filtered);
console.log("Mapped array:", mapped);
console.log("Reduced total:", reduced);

/*---objects----*/

//----create a book object
let book = {
    title: "JavaScript",
    author: "John",
    price: 200
};
book.price = 250;
console.log(book);
console.log(book.price);

//-----nested user object
let user = {
    name:"Sita",
    address: {
        city: "Chennai",
        state: "Tamilnadu"
    }
};
console.log(user.address.city);

//-----Array of three objects
let products = [
    { name: "Laptop", price:10000 },
    { name: "Mobile", price:5000 },
    { name: "Headphones", price: 1000}
];

products.forEach(function(product) {
    console.log("Product Name:", product.name);
});

//------destruction
let students = {
    name: "Nithyasree",
    age: 20,
    city: "Chennai"
};
let { name, age, city } = students;
console.log(name);
console.log(age);

//-------spread to copy an array
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let copy = [...arr1];
let combined = [...arr1, ...arr2];
console.log(copy);
console.log(combined);

//-----rest parameters
function add(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
}
    return total;
}
console.log(add(10,20));
console.log(add(10,20,30));

//------optional chaining
let user1 = {
    name : "Nithya",
};
let city1 = user1.address?.city;
console.log(city1);




