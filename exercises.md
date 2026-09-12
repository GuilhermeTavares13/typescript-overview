# TypeScript Exercises

Work through these in order. Create new `.ts` files (e.g. `exercise-1.ts`, `exercise-2.ts`...) — one file per exercise is fine.

---

## Level 1 — Primitives & Union Types

### 1.1 — Annotate everything

Write a file with these variables, each annotated with an explicit type:

```ts
let username // "guilherme"
let score    // 95
let hasPassed // true
let highScore // 0
```

Now make `highScore` a **union type** so it can be a number OR the string `"pending"` (for when the score hasn't been set yet). Set it to `"pending"` first, then reassign it to `100`.

### 1.2 — Narrowing a union

```ts
let value: string | number = "hello"
```

Write an `if` block that checks which type `value` actually is (use `typeof`). Inside each branch, `console.log` the value together with its type. Then try adding `value.toUpperCase()` — where does TS complain, and why?

---

## Level 2 — Arrays

### 2.1 — Array of strings

```ts
let toppings: string[] = ["mushroom", "onion", "basil"]
```

- Use `push` to add `"olive"`
- Use `includes` to check for `"olive"` and log the result
- Use `indexOf` to find `"onion"` and log its index
- Use `slice(1)` to log a copy without the first element (confirm `toppings` itself is unchanged)

### 2.2 — Filtering & mapping the menu

```ts
type Pizza = {
    name: string
    price: number
}

const menu: Pizza[] = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
]
```

- Use `filter` to get all pizzas that cost **10 or less**, log the result
- Use `map` to get an array of just the pizza **names**, log it
- Chain `filter` + `map` to get the names of pizzas that cost **more than 9**
- Use `reduce` to compute the **total price** of the whole menu, log it

### 2.3 — Array of arrays

Create `const pairs: number[][] = [[1, 2], [3, 4]]`. Use `map` on it to log the sum of each inner array (`3` and `7`).

---

## Level 3 — Objects & Optional Properties

### 3.1 — The full person

```ts
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
    hobbies?: string[]
}
```

Create two `Person` objects: one **without** `address` and `hobbies`, one with **both**. Then write:

- `function greet(p: Person): string` — returns `"Hi, {name}!"`
- `function getCountry(p: Person): string` — returns the country, or `"unknown"` if no address

**Challenge:** can you make `getCountry` without any `if` statements? (Hint: optional chaining `?.` and the nullish coalescing operator `??`)

### 3.2 — Updating an object

```ts
let order: { id: number; status: "ordered" | "completed" } = { id: 1, status: "ordered" }
```

- Try `order.status = "shipped"` — what error do you get? (This is a **literal union type**.)
- Write `function markComplete(o: { id: number; status: "ordered" | "completed" })` that only sets status to `"completed"` if it's still `"ordered"`. Call it on `order` twice — the second call should do nothing.

---

## Level 4 — Functions

### 4.1 — Annotate returns

Write these functions. Annotate **both** parameters and return types:

- `add(a: number, b: number): number`
- `repeatWord(word: string, times: number): string` — returns the word joined by spaces, e.g. `repeatWord("pizza", 3)` → `"pizza pizza pizza"` (hint: use an array with `fill` + `join`)
- `findPizzaByName(menu: Pizza[], name: string): Pizza | undefined` — like `find`, but as your own function using a `for` loop

### 4.2 — A function as a type

```ts
type PriceFormatter = (price: number) => string
```

- Write `const dollars: PriceFormatter` that returns `"$10"` for `10`
- Write `function applyPrice(list: Pizza[], format: PriceFormatter): string[]` that maps the menu through the formatter
- Call `applyPrice(menu, dollars)` and log the result

---

## Level 5 — Mini Project: Pizza Shop v2

Build `pizza-shop.ts`. Reuse the `Pizza` and `Order` types from `index.ts`, but extend `Order`:

```ts
type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed" | "cancelled"
    total: number
}
```

Implement:

1. `placeOrder(pizzaName: string): Order | undefined` — adds the price to `cashInRegister`, pushes the order, returns it (or `undefined` if the pizza doesn't exist)
2. `cancelOrder(orderId: number): Order | undefined` — marks an order `"cancelled"` and **subtracts** its total from `cashInRegister`. Return `undefined` if the id isn't found.
3. `getStats(): { totalOrders: number; totalRevenue: number; completedCount: number }` — revenue counts only **completed** orders
4. At the bottom: place 3 different orders, cancel one, complete one, then log `cashInRegister` and `getStats()`

**Expected final state** (if you order Pepperoni, Hawaiian, Veggie — then cancel Hawaiian, complete Pepperoni):
- `cashInRegister` = 100 + 10 + 10 + 9 - 10 = **119**
- `getStats()` → `{ totalOrders: 3, totalRevenue: 10, completedCount: 1 }`

---

## Bonus (only if the above is comfortable)

- **B.1** Convert `status: string` in your own code to a `type Status = "ordered" | "completed" | "cancelled"` and see how TS catches typos like `"complted"`.
- **B.2** Add `type ReadonlyPizza = Readonly<Pizza>` and try pushing a mutation into a `ReadonlyPizza`.
- **B.3** Write `function topExpensive(menu: Pizza[]): Pizza` using `reduce`, and think about what should happen with an empty menu (how do you type that case?).

---

## When you're done

Run `npx tsc --noEmit exercise-N.ts` on each file to make sure there are no type errors (TS must be installed: `npm i -D typescript`), then start a new session and show me your solutions — I'll review them line by line.
