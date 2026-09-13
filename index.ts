type Pizza = {
    id: number;
    name: string;
    price: number;
}

type Status = "completed" | "ordered"

type Order = {
    id: number;
    pizza: Pizza;
    status: Status;
}

const menu: Pizza[] = [
    {
        id: 1,
        name: "Margherita",
        price: 8
    },
    {
        id: 2,
        name: "Pepperoni",
        price: 10
    },
    {
        id: 3,
        name: "Hawaiian",
        price: 10
    },
    {
        id: 4,
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
    
    if (selectedOrderIndex === -1) {
        return;
    }
    
    orderQueue[selectedOrderIndex].status = "completed" 
    return orderQueue[selectedOrderIndex]
}

placeOrder("Pepperoni")

console.log(cashInRegister)
console.log(orderQueue)

completeOrder(1)

console.log(orderQueue)