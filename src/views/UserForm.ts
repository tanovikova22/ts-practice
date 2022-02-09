import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserForm extends View<User, UserProps>{


    eventsMap(): { [key: string] : () => void } {
        return {
            "click:.set-age": this.onSetAgeClick,
            "click:.set-name": this.onSetNameClick,
            "click:.save-model": this.onSaveClick,
        }
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }// because of loosing context

    onSetNameClick = (): void => {
        const input = this.parent.querySelector("input");

        if(input) {
            const name = input.value;
            this.model.set({ name })
        }
    }

    onSaveClick = (): void => {
        this.model.save();
    }

    template(): string {
        return `
            <div>
                <input type="text" placeholder="${this.model.get('name')}">
                <button class="set-name">Change name</button>
                <button class="set-age">Set Random age</button>
                <button class="save-model">Save user</button>
            </div> 
        `;
    }

}