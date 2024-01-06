import { BattleContext } from "./battle-context.js"

/**
 * Battle
 */
export class Battle {
  constructor(private context: BattleContext) {}

  addCommand() {
    return new BattleContext({
      commands: [],
    })
  }
}
