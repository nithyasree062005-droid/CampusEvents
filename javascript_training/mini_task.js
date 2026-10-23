/*----MOD 1-5 -basic javascript----*/
//----print your name, course and number
console.log("Name:Nithyasree");
console.log("Course:CSBS");
console.log("Number:10");

//----variable
let eventName = "Cultural";
let ticketPrice = 100;
let availableTickets = 50;
console.log("Event Name", eventName);
console.log("Ticket Price:", ticketPrice);
console.log("Available Tickets:", availableTickets);

//-----total price
let totalPrice = ticketPrice * 3;
console.log("Total Price:", totalPrice);
if (totalPrice > 200) {
    console.log("You have exceeded the budget");
} else {
    console.log("Total does not exceed 200");
}

//-----number is positive, zero or negative
let number = 5;
if (number > 0) {
    console.log("The number is positive");
} else if (number === 0) {
    console.log("The number is zero");
} else {
    console.log("The number is negative");
}

//-----print the even numbers
for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}

/*-----MOD 6-7 - functions and arrays-----*/

//----calculate total price
function calculateTotalPrice(price, quantity) {
    return price * quantity;
}
console.log(calculateTotalPrice(100, 3));

//------name and greeting
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("Nithyasree");

//-----Array of five event names and length
let events = ["Cultural", "Sports", "Music", "Art", "Dance"];
console.log("Events:", events);
console.log("Number of events:", events.length);

//-----Filter
let numbers = [5, 12, 8, 20, 15];
let filteredNumbers = numbers.filter(function(num) {
    return num > 10;
});
console.log("Filtered numbers:", filteredNumbers);

//-----Map
let values = [2, 4, 6, 8, 10];
let doubled = values.map(function(num) {
    return num * 2;
});
console.log("Doubled numbers:", doubled);

//----Reduce
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

/*---MOD 8-9 -objects----*/

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
    name: "Sita",
    address: {
        city: "Chennai",
        state: "Tamilnadu"
    }
};
console.log(user.address.city);

//-----Array of three objects
let products = [
    { name: "Laptop", price: 10000 },
    { name: "Mobile", price: 5000 },
    { name: "Headphones", price: 1000 }
];
products.forEach(function(product) {
    console.log("Product Name:", product.name);
});

//------destructuring
let students = {
    name: "Nithyasree",
    age: 20,
    city: "Chennai"
};
let { name, age, city } = students;
console.log(name);
console.log(age);

//-------spread to copy an array
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
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
console.log(add(10, 20));
console.log(add(10, 20, 30));

//-----optional chaining
let user1 = {
    name: "Nithya",
};
let city1 = user1.address?.city;
console.log(city1);

/*----- MOD 10 - scope, hoisting and closure-----*/

//-----global variable
var name2 = "Priya";
function showGlobalName() {
    console.log(name2);
}
showGlobalName();

//----if block with let and var
if (true) {
    let a = 10;
    var b = 20;
}
console.log(b);

//----predict var and let behaviour
console.log(a);
var a = 10;
console.log(b);
let c = 20;

//-----makeCounter()
function makeCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}
let counter = makeCounter();
counter();
counter();
counter();

/*----MOD 11 - DOM------*/

//-----DOM code only in a browser
if (typeof document !== "undefined") {
//----Heading text using id
   document.getElementById("heading").textContent =
    "Upcoming Campus Events";

//-----Highlight the events
let cards = document.querySelectorAll(".event-card");
cards.forEach(function(card) {
        card.classList.add("highlight");
    });

//-----Read the name from input
function showName() {
    let name = document.getElementById("name").value;
    document.getElementById("result").textContent =
        "Hello, " + name;
    }

//-----Connect Show Name button
    document.getElementById("showNameButton")
        .addEventListener("click", showName);

//-----Create a card
let event = {
    title: "Tech Fest",
    date: "20 October 2026"
    };
let card = document.createElement("div");
card.textContent = event.title + " - " + event.date;
document.getElementById("event-list").appendChild(card);

//----Remove an element
function addEvent() {
    let card = document.createElement("div");
    card.textContent = "Tech Fest ";
    let btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.type = "button";
    btn.onclick = function() {
            card.remove();
        };
    card.appendChild(btn);
    document.getElementById("event-list").appendChild(card);
    }

//------ Connect Add Event button
document.getElementById("addEventButton")
    .addEventListener("click", addEvent);

/*------MOD  12 - Events, event listeners and forms------*/

//------Event to update status
let button = document.getElementById("btn");
let status = document.getElementById("status");

button.addEventListener("click", function() {
        status.textContent = "Button clicked successfully!";
    });

//------Live character count
let input = document.getElementById("message");
let count = document.getElementById("count");
input.addEventListener("input", function() {
    count.textContent = input.value.length;
});

//------Registration form without page reload
let form = document.getElementById("registerForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();

//-------Error and success messages
let result = document.getElementById("result");
if (name === "" || email === "") {
            result.textContent = "Please fill in all fields!";
    } else {
            result.textContent = "Registration successful!";
        }
    });
}

/*-----MOD 13 - callback asynchronous function-----*/

//-----predict the output
console.log("one");
setTimeout(()  => console.log("Two"), 0)
console.log("Three");

//-------change 0 - 500
console.log("one");
setTimeout(() => console.log("Two"), 500);
console.log("Three");

//------registration form
console.log("Registration form submitted");
setTimeout(() => {
    console.log("Registration successful");
}, 2000);

/*----MOD 14 - event loops----*/

console.log("Start"); // syn code 1 [Start]
setTimeout(() => console.log("Timer"), 0); // 4 [timer]
Promise.resolve().then(() => console.log("Promise")); // 3 [promise]
console.log("Finish"); // syn code 2 [Finish]

