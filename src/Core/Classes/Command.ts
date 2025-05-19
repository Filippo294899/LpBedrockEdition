import { system , CustomCommand,CustomCommandOrigin ,CustomCommandResult } from '@minecraft/server';
import { Player, Entity, Block } from '@minecraft/server';
export default class Command {
  static registerEnum(id: string, values: string[]) {
    system.beforeEvents.startup.subscribe(data => {
      data.customCommandRegistry.registerEnum(id, values)
    })
  }

    static register(customCommand: CustomCommand, callback: (...args: any[]) => CustomCommandResult): void {
    customCommand.name = 'lp:' + customCommand.name
    system.beforeEvents.startup.subscribe(data => {
      data.customCommandRegistry.registerCommand(customCommand, ((origin, ...commandArgs) => {
        const commandData = new CommandData(origin, commandArgs || []);
        return callback(commandData);
      }))
    })
  }
}


export class CommandData {
  private args: any[];
  private data: any;
  
  constructor(data: any, args: any[]) {
    this.data = data;
    this.args = args;
  }

  get source(): Player | Block | Entity | undefined { 
    return (
      this.data.initiator || 
      this.data.sourceBlock || 
      this.data.sourceEntity
    )
  }

  get sourceType() { 
    return this.data.sourceType 
  }
  get commandArguments() { 
    return this.args.concat([])
  }
}