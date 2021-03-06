import { Callback } from "./Eventing";
import {AxiosPromise, AxiosResponse} from "axios";
import { UserProps } from "./User";

interface ModelAttributes<T> {
    set(value: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Eventing {
    on(eventName: string, callback: Callback) : void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Eventing,
        private sync: Sync<T>
    ) {}


    get on() {
        return this.events.on;
    }
    // equivalent to on = this.events.on;


    get trigger() {
        return this.events.trigger;
    }
    // equivalent to trigger = this.events.trigger;


    get get() {
        return this.attributes.get;
    }

    set(update: T) {
        this.attributes.set(update);
        this.events.trigger("change");
    }

    fetch() : void {
        const id =  this.get("id");
        if(typeof id !== "number") {
            throw new Error("Cannot fetch without an id");
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save() : void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger("save");
            })
            .catch(() => {
                this.trigger("error");
            })
    }
}