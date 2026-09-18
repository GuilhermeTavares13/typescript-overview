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

let nextPizzaId = 1;

const menu: Pizza[] = [
    {
        id: nextPizzaId++,
        name: "Margherita",
        price: 8
    },
    {
        id: nextPizzaId++,
        name: "Pepperoni",
        price: 10
    },
    {
        id: nextPizzaId++,
        name: "Hawaiian",
        price: 10
    },
    {
        id: nextPizzaId++,
        name: "Veggie",
        price: 9
    },
]

let cashInRegister = 100
const orderQueue: Order[] = []


function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(newPizza)

    return newPizza;
}


function placeOrder(pizzaName: string): Order | undefined {
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


function completeOrder(orderId: number): Order | undefined {
    const selectedOrderIndex = orderQueue.findIndex((orderObj) => orderObj.id === orderId);
    
    if (selectedOrderIndex === -1) {
        return;
    }
    
    orderQueue[selectedOrderIndex].status = "completed" 
    return orderQueue[selectedOrderIndex]
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof(identifier) === 'string') {
        return menu.find((pizzaObj) => pizzaObj.name.toLowerCase() === identifier.toLowerCase());
    } 
    else if (typeof(identifier) === 'number') {
        return menu.find((pizzaObj) => pizzaObj.id === identifier);
    } 
    else {
        throw new TypeError("Parameter `identifier` must be either a string or a number");
    }
}



addNewPizza({ name: "Chocolatte", price: 90 });
addNewPizza({ name: "Glass", price: 666 });

console.log(getPizzaDetail(5));
console.log(getPizzaDetail(6));