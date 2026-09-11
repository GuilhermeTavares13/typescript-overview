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
]

let cashInRegister = 100
const orderQueue = []


function addNewPizza(pizzaObj) {
    menu.push(pizzaObj)
}


function placeOrder(pizzaName) {
    menu.map((item) => {
        if (item.name == pizzaName) {
            cashInRegister += item.price
            orderQueue.push({item, status: "ordered"})
            return orderQueue
        }
    })
}

placeOrder("Pepperoni")

console.log(cashInRegister)
console.log(orderQueue)