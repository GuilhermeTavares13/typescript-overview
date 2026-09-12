"use strict";
const menu = [
    {
        name: "Margherita",
        price: 8
    },
    {
        name: "Pepperoni",
        price: 10
    },
    {
        name: "Hawaiian",
        price: 10
    },
    {
        name: "Veggie",
        price: 9
    },
];
let cashInRegister = 100;
const orderQueue = [];
function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
}
function placeOrder(pizzaName) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`);
        return;
    }
    cashInRegister += selectedPizza.price;
    const newOrder = { id: orderQueue.length + 1, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    const selectedOrderIndex = orderQueue.findIndex((orderObj) => orderObj.id === orderId);
    orderQueue[selectedOrderIndex].status = "completed";
    return orderQueue[selectedOrderIndex];
}
placeOrder("Pepperoni");
console.log(cashInRegister);
console.log(orderQueue);
completeOrder(1);
console.log(orderQueue);
