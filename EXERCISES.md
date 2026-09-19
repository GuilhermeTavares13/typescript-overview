# TypeScript Exercises

Based on what you've built so far:

| File | What you've practiced |
|---|---|
| `arrays.ts`, `index.ts` | Primitive types, typed arrays, object types |
| `objects.ts` | Optional properties (`?`), early return on missing data |
| `literaltypes.ts`, `unions.ts` | Literal types, union types |
| `index.ts` | Narrowing with `typeof`, returning `T \| undefined` |
| `user.ts` | Utility types `Partial`, `Omit`, spread + `Object.assign` |
| `generics.ts` | Basic generic function `<T>` |

## How to work through these

1. Create one file per exercise in the repo root: `exercise01.ts`, `exercise02.ts`, ...
2. Replace the `// TODO` parts with your implementation.
3. Make sure both of these pass:
   ```bash
   npx tsc --noEmit exercise01.ts   # no type errors
   node exercise01.ts               # expected output below
   ```
4. When done, open a new session and show me your exercise files — we'll check them together.

Rules: no `any`, no type assertions (`as`), no `!` non-null assertions. If something feels like you *need* one, there's probably a better typing approach.

---

## Exercise 1 — Robot (easy)

**Practices:** literal types, object types, returning new objects.

```ts
type Direction = "up" | "down" | "left" | "right";

type Position = {
  x: number;
  y: number;
};

// "up"    -> y increases
// "down"  -> y decreases
// "left"  -> x decreases
// "right" -> x increases
function move(position: Position, direction: Direction, distance: number): Position {
  // TODO — return a new Position, don't mutate the input
}

// Euclidean distance: Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
function distance(a: Position, b: Position): number {
  // TODO
}

console.log(move({ x: 0, y: 0 }, "up", 5));   // { x: 0, y: 5 }
console.log(move({ x: 3, y: 3 }, "left", 1)); // { x: 2, y: 3 }
console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5
```

**Stretch:** add a `moves: Direction[]` version — `walk(position: Position, moves: Direction[]): Position` that applies each move with distance 1.

---

## Exercise 2 — Shapes (easy)

**Practices:** discriminated unions, narrowing on a property (like your `typeof` check in `index.ts`, but using a string field).

```ts
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  // TODO — circle: Math.PI * radius ** 2, square: side ** 2
  // You should be able to narrow with: if (shape.kind === "circle") { ... }
}

function describe(shape: Shape): string {
  // TODO — "circle with radius 3" / "square with side 4"
}

const shapes: Shape[] = [
  { kind: "circle", radius: 3 },
  { kind: "square", side: 4 },
  { kind: "circle", radius: 1 },
];

for (const s of shapes) {
  console.log(describe(s), area(s));
}
```

**Expected output:**
```
circle with radius 3 28.274333882308138
square with side 4 16
circle with radius 1 3.141592653589793
```

**Question to answer (comment at the bottom):** why does `if (shape.kind === "circle")` let TypeScript know `shape` is a `Circle` inside the block, while `if (typeof x === "string")` works the same way for `string | number`?

---

## Exercise 3 — Inventory (medium)

**Practices:** `Pick`, `Record<string, V>`, iterating objects.

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  tags: string[];
};

// TODO — type with only the id and name properties
type ProductSummary = ...

function toSummary(products: Product[]): ProductSummary[] {
  // TODO
}

// Maps a sku (like "coffee") to how many units are in stock
type Inventory = Record<string, number>;

function restock(inventory: Inventory, sku: string, amount: number): void {
  // TODO — add `amount` to the existing count, or create the sku if missing
  // (mutating the object here is fine)
}

function totalValue(inventory: Inventory, prices: Record<string, number>): number {
  // TODO — sum quantity * price for every sku; treat a missing price as 0
}

const products: Product[] = [
  { id: 1, name: "Coffee", price: 5, tags: ["drink", "hot"] },
  { id: 2, name: "Bread", price: 3, tags: ["food"] },
];

console.log(toSummary(products));
// [ { id: 1, name: 'Coffee' }, { id: 2, name: 'Bread' } ]

const stock: Inventory = { coffee: 10 };
restock(stock, "bread", 4);
restock(stock, "coffee", 5);
console.log(stock); // { coffee: 15, bread: 4 }

const prices: Record<string, number> = { coffee: 5, bread: 3, jam: 7 };
console.log(totalValue(stock, prices)); // 15 * 5 + 4 * 3 = 93
```

**Stretch:** `type ExpensiveProduct = ...` — a `Product` where `price` must be at least some value can't be expressed with built-in utility types alone; instead, write `function isExpensive(p: Product): boolean` and filter your list with it.

---

## Exercise 4 — Smarter generics (medium)

**Practices:** generic constraints (`extends`), `keyof`, multiple type parameters, intersection types.

You've written `function getLastItem<T>(array: T[]): T`. Now constrain `T`:

```ts
// Only works for items that have an id property
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  // TODO
}

// The key must actually exist on the object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // TODO
}

// Combines two objects
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  // TODO — Object.assign({}, a, b) is allowed here
}

const users = [
  { id: 1, name: "Alice", age: 42 },
  { id: 2, name: "Bob", age: 33 },
];

console.log(findById(users, 2));  // { id: 2, name: 'Bob', age: 33 }
console.log(findById(users, 99)); // undefined

const point = { x: 1, y: 2 };
console.log(getProperty(point, "x")); // 1
console.log(getProperty(point, "y")); // 2

console.log(merge({ a: 1 }, { b: true })); // { a: 1, b: true }
```

**Required type-error test:** try `getProperty(point, "z")` — it must NOT compile. Leave it in a comment at the bottom as proof you tried.

**Question to answer:** in `merge<T extends object, U extends object>(a: T, b: U): T & U`, what is the type of the result when you call `merge({ a: 1 }, { b: true })`?

---

## Exercise 5 — Type predicates (tricky)

**Practices:** `value is T` — the "type guard as a function" version of your `if (!user) return` pattern.

```ts
// A function that tells TypeScript "if I return true, the value is really T"
function isDefined<T>(value: T | undefined | null): value is T {
  // TODO
}

const values: (number | null)[] = [1, null, 2, null, 3];

// Without isDefined, .filter() would leave the type as (number | null)[]
const clean: number[] = values.filter(isDefined);
console.log(clean); // [ 1, 2, 3 ]
```

**Then, the real task:** go back to your `index.ts` style — a list of orders where some lookups can fail:

```ts
type Pizza = { id: number; name: string; price: number };

type Order = { id: number; pizza: Pizza; status: "ordered" | "completed" };

function getOrder(orders: Order[], id: number): Order | undefined {
  // TODO
}

// TODO: given a list of order IDs (some of which may not exist),
// return an array of ONLY the orders that exist — and the type must
// be Order[], not (Order | undefined)[].
function getExistingOrders(orders: Order[], ids: number[]): Order[] {
  // TODO — use getOrder, then use isDefined with .filter
}

const orders: Order[] = [
  { id: 1, pizza: { id: 1, name: "Margherita", price: 8 }, status: "ordered" },
  { id: 2, pizza: { id: 2, name: "Pepperoni", price: 10 }, status: "completed" },
];

console.log(getExistingOrders(orders, [1, 99, 2]));
```

**Question to answer:** in your own words, what does `value is T` in a return type actually do at compile time?

---

## Exercise 6 — Final project: Pizza shop v2 (hard)

**Practices:** everything combined. Build this in `exercise06.ts`, starting from the patterns in your `index.ts`.

Requirements:

1. **Statuses:** your shop has more steps now:
   ```ts
   type OrderStatus = "ordered" | "preparing" | "completed";
   ```

2. **Channels** — an order is either picked up or delivered:
   ```ts
   type Pickup = { channel: "pickup" };
   type Delivery = { channel: "delivery"; address: string };
   type Channel = Pickup | Delivery;
   ```

3. **Order type** combining the above (you'll need `pizza`, `status`, `channel` and an `id`).

4. **Functions:**
   - `queueOrder(pizza: Pizza, channel: Channel): Order` — assigns the next id, starts as `"ordered"`.
   - `prepareOrder(orderId: number): Order | undefined` — moves `"ordered"` → `"preparing"`. If the order is already `"preparing"` or `"completed"`, don't change it (just return it or undefined if not found).
   - `completeOrder(orderId: number): Order | undefined` — moves any other status → `"completed"`.
   - `eta(order: Order): string` — returns `"ready for pickup in 20 min"` for pickup, or `"delivering to <address> in 45 min"` for delivery. This one must use narrowing on `channel`.
   - `firstOrderWhere<T>(orders: T[], matches: (order: T) => boolean): T | undefined` — a generic helper.
   - Use `firstOrderWhere` to find the first `"preparing"` order in a `main` section, and print its `eta`.

5. **In the `main` section**, create at least 3 orders (mix of pickup and delivery), prepare and complete some of them, and print:
   - all orders (`console.log(orders)`)
   - the `eta` of each
   - the first preparing order's eta via `firstOrderWhere`

**Bonus (+1):** add `type OrderEvent = { type: "queued"; at: number } | { type: "prepared"; at: number } | { type: "completed"; at: number }`, give each order an `events: OrderEvent[]` array, and write `function log(order: Order): string[]` that formats each event (e.g. `"queued at 1000"`). Narrowing the `type` field is the point.

---

## Done?

When all files pass `tsc --noEmit` and print the expected output, start a new session and say: *"Check my TypeScript exercise answers"* — I'll read your `exercise0N.ts` files and go through them with you.
