import { DungeonViewContext } from "./dungeon-context.js"

export class DungeonView {
  static fromJSON(json: string) {
    const props = JSON.parse(json)
    return new DungeonViewContext(props)
  }
}
