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
