import { world ,Player, system} from "@minecraft/server"
import { BlockBreak } from "Core/Permissions/BlockBreak"






// Block Break 

const blockBreak = new BlockBreak()
world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
        system.run(() => {
                try{
                        blockBreak.trigger(eventData)
                }
                catch(error) {
                        console.warn(`BlockBreak: ${error}`)
                }
        
        }
        );

})