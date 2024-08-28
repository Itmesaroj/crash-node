
const sum = require("./sum");
const multiply = require("./multiplication");
const division=require("./divison")
const substract=require("./subtraction")
let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(sumResult);

let mulA = 4;
let mulB = 6;
let mulResult = multiply(mulA, mulB);
console.log(mulResult);

let div1=2
let div2=4
let divResult=division(div1,div2)
console.log(divResult)


let sub1=9
let sub2=8

let subResult=substract(sub1,sub2)
console.log(subResult)