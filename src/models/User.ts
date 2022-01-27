import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { APISync } from "./APISync";
import { Eventing } from "./Eventing";

export interface UserProps {
    id?: number,
    name?: string;
    age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps>{
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new APISync<UserProps>(rootUrl)
        )
    }
}

const user = User.buildUser({id: 56, name: "Test"});
user.get("name");


//162 - start