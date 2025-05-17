import { world } from "@minecraft/server";
 // puoi aggiungere altri comandi
class CommandManager {

    public commands: any[] = [];
    constructor() {
        this.commands = [];

    }
    public Register(command: any) {
        this.commands.push(command);
    }

    public Commands() {
        return this.commands;
    }





}
export default  CommandManager;










