
import { world , Player} from "@minecraft/server";
import Help from "./Classes/Help";

import CommandManager from "./Classes/CommandManager";


const commandManager = new CommandManager();
commandManager.Register(new Help());
world.beforeEvents.chatSend.subscribe((event) => {
    const { message, sender } = event;

    for (const command of commandManager.commands) {
        if (command.called(message, sender)) {
            event.cancel = true;
            return;
        }
    }

    // Se nessun comando è stato chiamato, manda il messaggio con formato

});