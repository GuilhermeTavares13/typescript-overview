"use strict";
let nextUserId = 1;
const users = [
    { id: nextUserId++, username: "john_doe", role: "member" },
    { id: nextUserId++, username: "jane_smith", role: "contributor" }
];
function updateUser(id, updates) {
    const user = users.find((user) => user.id === id);
    if (!user) {
        return;
    }
    Object.assign(user, updates);
}
// console.log(users);
// updateUser(1, {username: "new_john_doe"});
// updateUser(2, {role: "member"});
// console.log(users);
function addNewUser(newUser) {
    const user = {
        id: nextUserId++,
        ...newUser
    };
    users.push(user);
    return user;
}
addNewUser({ username: "jon_schmoe", role: 'member' });
console.log(users);
