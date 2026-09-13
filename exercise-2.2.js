"use strict";
const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
    { name: "Chocolate Pizza", price: 11 },
];
console.log(menu.filter((pizza) => pizza.price <= 10));
menu.map((pizza) => console.log(pizza.name));
menu.filter((pizza) => pizza.price > 9).map((pizza) => console.log(pizza.name));
let totalPrice = 0;
let result = menu.reduce((accumulator, pizza) => accumulator + pizza.price, totalPrice);
console.log(totalPrice);
