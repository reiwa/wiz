import { DungeonViewContext } from "./dungeon-view-context.js"

export class DungeonViewContextFactory {
  static fromJSON(json: string) {
    const props = JSON.parse(json)
    return new DungeonViewContext(props)
  }
}
