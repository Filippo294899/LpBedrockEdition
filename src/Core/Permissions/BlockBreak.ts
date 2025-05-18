import { Permission } from "./Permission";
import { world , Player,system, PlayerBreakBlockBeforeEvent} from "@minecraft/server";
import { Broadcast } from "../Broadcast";

export class BlockBreak extends Permission {
    constructor() {
        super("BlockBreak", "Allows the player to break blocks.");
    }

    public trigger(eventData: PlayerBreakBlockBeforeEvent) {
        const player = eventData.player;
        const block = eventData.block;
        const blockName = block.typeId;
        const blockPos = block.location;
        const { x, y, z } = blockPos;

        if (player.hasTag("Operator")) {
            Broadcast.toPlayer(player, `§7You broke a block!`);
            return;
        }

        eventData.cancel = true;
        Broadcast.toPlayer(player, `§7You are not allowed to break blocks!`);
        console.warn(`BlockBreak: Block ${blockName} restored at ${x} ${y} ${z} after ${player.name} tried to break it.`);
    }
}

const blockBreak = new BlockBreak()

world.beforeEvents.playerBreakBlock.subscribe(
    blockBreak.trigger.bind(blockBreak)
);





