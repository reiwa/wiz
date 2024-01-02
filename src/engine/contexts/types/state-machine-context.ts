import { ConfigContext } from "../config-context.js"
import { DungeonViewContext } from "../dungeon-view-context.js"
import { MapViewContext } from "../map-view-context.js"
import { PlayerContext } from "../player-context.js"
import { TownViewContext } from "../town-view-context.js"

export type StateMachineContext = {
  player: PlayerContext
  config: ConfigContext
  townView: TownViewContext
  dungeonView: DungeonViewContext
  mapView: MapViewContext
}
