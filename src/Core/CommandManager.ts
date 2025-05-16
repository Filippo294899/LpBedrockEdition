import { world } from "@minecraft/server";
import Command from "./Classes/Command";
import Help from "./Classes/Help";
import Message from "./Classes/Message";
const commands = [new Help()]; // puoi aggiungere altri comandi

world.beforeEvents.chatSend.subscribe((event) => {
    const { message, sender } = event;

    for (const command of commands) {
        if (command.called(message, sender)) {
            event.cancel = true;
            return;
        }
    }

    // Se nessun comando è stato chiamato, manda il messaggio con formato

});