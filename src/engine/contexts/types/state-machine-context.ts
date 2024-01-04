import { ActorContext } from "../actor-context.js"
import { BattleContext } from "../battle-context.js"
import { ConfigContext } from "../config-context.js"
import { DungeonViewContext } from "../dungeon-context.js"
import { FieldContext } from "../field-context.js"
import { MapSheetContext } from "../map-sheet-context.js"
import { ViewportContext } from "../viewport-context.js"

export type StateMachineContext = {
  player: ActorContext
  config: ConfigContext
  fieldView: FieldContext
  dungeonView: DungeonViewContext
  mapSheet: MapSheetContext
  battle: BattleContext
  viewport: ViewportContext
}
