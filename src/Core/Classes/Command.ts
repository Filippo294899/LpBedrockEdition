import  Message  from "./Message";

class Command {
    name: string;
    description: string;
    aliases: string[];
    Prefix: string;
    
    constructor(name: string, description: string, aliases: string[]) {
        this.Prefix = "!";
        this.name = name;
        this.description = description;
        this.aliases = aliases;
    }

    // Chiamato dal gestore dei comandi
    called(message: string, sender: any){
        if (!message.startsWith(this.Prefix)) return false;
        const commandName = message.slice(this.Prefix.length).split(" ")[0].toLowerCase();
        console.warn(`Command called: ${commandName}`);
        if (
            commandName === this.name.toLowerCase() ||
            this.aliases.map(a => a.toLowerCase()).includes(commandName)
        ) {
            this.execute(message, sender);
            return true;
        }
    
        return false;
    }

    // Da implementare nelle sottoclassi
    execute(message: string, sender: any): void {
        // Override nelle sottoclassi
    }
}

export default Command;