import { User } from "./models/User";

const user = new User({ name: 'tanya', age: 33 });
user.save();