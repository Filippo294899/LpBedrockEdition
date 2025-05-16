import Command from "./Command";
import { world } from "@minecraft/server";

class Help extends Command {
    constructor() {
        super("help", "Displays a list of available commands.", ["h", "Help", "HELP", "H"]);
    }

    execute(message: string, sender: any): void {
        console.warn("Help command executed");
        sender.sendMessage("§l§8[§aL§bP§8]§7Available commands:");
}
}
export default Help;
