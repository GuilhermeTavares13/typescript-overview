let value: string | number = "hello";

if (typeof(value) == "string") {
    console.log(value, typeof(value))
    console.log(value.toUpperCase);
} 
if (typeof(value) === "number") {
    console.log(value, typeof(value))
    console.log(value.toUpperCase);
}

// Typescript complains in the number if block, because numbers don't carry the method for casing
