type Pizza = {
    name: string;
    price: number;
}

type Order = {
    id: number;
    pizza: Pizza;
    status: string;
}

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
const orderQueue: Order[] = []


function addNewPizza(pizzaObj: Pizza) {
    menu.push(pizzaObj)
}


function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    
    
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: orderQueue.length + 1, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}


function completeOrder(orderId: number) {
    const selectedOrderIndex = orderQueue.findIndex((orderObj) => orderObj.id === orderId);
    orderQueue[selectedOrderIndex].status = "completed" 
    return orderQueue[selectedOrderIndex]
}

placeOrder("Pepperoni")

console.log(cashInRegister)
console.log(orderQueue)

completeOrder(1)

console.log(orderQueue)