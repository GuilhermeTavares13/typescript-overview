type Address = {
    street: string
    city: string
    country: string
}


type Person = {
    name: string
    age: number
    isStudent: boolean
    address?: Address
}

let person1: Person = {
    name: "Joe",
    age: 42,
    isStudent: true,
}

let person2: Person = {
    name: "Jill",
    age: 66,
    isStudent: false,
    address: {
        street: "Any street",
        city: "Any city",
        country: "Any country"
    }
}

function displayInfo(person: Person) {
    if (!person.address)
        return
    console.log(`${person.address.street}`)
}

displayInfo(person1)