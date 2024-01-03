import { ConfigContext } from "../config-context.js"
import { DungeonViewContext } from "../dungeon-view-context.js"
import { FieldViewContext } from "../field-view-context.js"
import { MapViewContext } from "../map-view-context.js"
import { PlayerContext } from "../player-context.js"

export type StateMachineContext = {
  player: PlayerContext
  config: ConfigContext
  fieldView: FieldViewContext
  dungeonView: DungeonViewContext
  mapView: MapViewContext
}
