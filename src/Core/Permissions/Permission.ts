import { world, Player } from "@minecraft/server";



export abstract class Permission {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract trigger(EventData: object): void;
}