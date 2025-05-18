import Command from "./Command";
import { Player  ,CustomCommand, CustomCommandParamType, CommandPermissionLevel,system} from "@minecraft/server";
import { CommandData } from "./Command";
import { Broadcast } from "Core/Broadcast";
console.warn("Command: Test Command Loaded")
system.run(() => {
Broadcast.toWorld("§l§8[§aL§bP§8]§7 Test Command Loaded")

}
)
Command.register(
  {
    name: 'test',
    description: 'Test command',
    permissionLevel: CommandPermissionLevel.Admin,
    mandatoryParameters: [
      {
        name: 'test',
        type: CustomCommandParamType.String
      }
    ]   
  },
    (commandData: CommandData) => {
        const { source, commandArguments } = commandData;
        if (source instanceof Player) {
            source.sendMessage(`Command executed with argument: ${commandArguments[0]}`);
        }
        return { status: 0 };
    }
)
