import { ActorContext } from "../actor-context.js"
import { ConfigContext } from "../config-context.js"
import { DungeonViewContext } from "../dungeon-view-context.js"
import { FieldViewContext } from "../field-view-context.js"
import { MapViewContext } from "../map-view-context.js"

export type StateMachineContext = {
  player: ActorContext
  config: ConfigContext
  fieldView: FieldViewContext
  dungeonView: DungeonViewContext
  mapView: MapViewContext
}
