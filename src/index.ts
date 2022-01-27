import { User } from "./models/User";

const user = User.buildUser({ id: 15, name: "Oleg", age: 44});

console.log(user);
