import {Player, World } from "mojang-minecraft";
export  default class Message {
   constructor(sender , message) {

         sender.runCommand(`tellraw @s {"rawtext":[{"text":"§l§8[§aL§bP§8]§7${message}"}]}`);
    }



   }


