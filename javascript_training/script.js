console.log("Hello, Js");
console.log("This is simple JavaScript language");

//----- Data Types 
let number = 10;
console.log(number);
console.log(typeof number);

//---- Type Coercion 
console.log("5" + 2); 
console.log("5" - 2); 

//---- Arithmetic Operators
let a = 10;
let b = 20;
console.log(a + b); 
console.log(a - b); 
console.log(a * b); 
console.log(a / b); 

//----- Comparison Operators
console.log(a == b);  
console.log(a != b);  
console.log(a > b);   
console.log(a < b);   
console.log(a === b); 

//---- Logical Operators
console.log(a > b && a < b); 
console.log(a > b || a < b); 
console.log(!(a > b));       

// ----- Ternary Operator
let age = 18;
let result = age >= 18 ? "Eligible" : "Not eligible";
console.log(result);

//----- If else Statement
let marks = 85;
if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 80) {
    console.log("Grade B");
} else {
    console.log("Fail");
}

// ----- Switch Statement
let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    default:
        console.log("Invalid day");
}

//---- Truthy and Falsy Values
console.log(Boolean(1));        
console.log(Boolean(-1));       
console.log(Boolean("hello"));  
console.log(Boolean(false));   
console.log(Boolean(0));       
console.log(Boolean(-0));      
console.log(Boolean(""));      

//----- Function Declaration
function greet() {
    console.log("Hello World!");
}
greet();

//----- Parameters and Arguments
function add(x, y) {
    return x + y;
}
console.log(add(5, 10)); 

//----- Return Values and console.log 
function multiply(x, y) {
    return x * y;
}
let product = multiply(5, 10);
console.log(product); 

//----- Function Expression 
const subtract = function(x, y) {
    return x - y;
};
console.log(subtract(10, 4)); 

//----- Arrow Function 
const square = (num) => {
    return num * num;
};
console.log(square(5)); 

//----- Short Arrow Function
const squareShort = num => num * num;
console.log(squareShort(6)); 

//----- Function Scope 
let message = "Global variable";
function showMessage() {
    let localMessage = "Local variable";
    console.log(message);
    console.log(localMessage);
}
showMessage();

//------event loops
console.log("A"); // syn code 1 [A]
setTimeout(() => console.log("B"), 0); // 4 [B]
Promise.resolve().then(() => console.log("C")); // 3 [C]
console.log("D"); // syn code 2 [D] 
