import { world, World, Player, PlayerBreakBlockBeforeEvent } from "@minecraft/server";

export class Broadcast {
    static toPlayer(player: Player, message: string) {
        this.sendMessage(player, message);
    }

    static toWorld(message: string) {
        this.sendMessage(world, message);
    }

    private static sendMessage(receiver: Player | World, message: string) {
        receiver.sendMessage(`§l§8[§aL§bP§8]§7 ${message}`);
    }
}