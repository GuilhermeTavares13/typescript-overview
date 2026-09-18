type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

let nextUserId = 1;

                    // Utility type
type UpdatedUser = Partial<User>;

const users: User[] = [
    { id: nextUserId++, username: "john_doe", role: "member"},
    { id: nextUserId++, username: "jane_smith", role: "contributor" }
]

function updateUser(id: number, updates: UpdatedUser): void {
    const user = users.find((user) => user.id === id);

    if (!user) {
        return
    }

    Object.assign(user, updates);
}


// console.log(users);

// updateUser(1, {username: "new_john_doe"});
// updateUser(2, {role: "member"});

// console.log(users);

function addNewUser(newUser: Omit<User, "id">): User {
    const user: User = {
        id: nextUserId++,
        ...newUser
    }

    users.push(user);

    return user
}

addNewUser({username: "jon_schmoe", role: 'member'});

console.log(users);

