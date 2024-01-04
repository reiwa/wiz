import { ActorContext } from "../actor-context.js"
import { BattleContext } from "../battle-context.js"
import { ConfigContext } from "../config-context.js"
import { DungeonViewContext } from "../dungeon-context.js"
import { FieldViewContext } from "../field-view-context.js"
import { MapSheetContext } from "../map-sheet-context.js"

export type StateMachineContext = {
  player: ActorContext
  config: ConfigContext
  fieldView: FieldViewContext
  dungeonView: DungeonViewContext
  mapSheet: MapSheetContext
  battle: BattleContext
}
