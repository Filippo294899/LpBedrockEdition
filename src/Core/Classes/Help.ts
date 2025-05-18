import Command from "./Command";
import { Player  ,CustomCommand, CustomCommandParamType} from "@minecraft/server";
import { CommandData } from "./Command";
Command.register(
  {
    name: 'test',
    description: 'Test command',
    permissionLevel: 1,
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
