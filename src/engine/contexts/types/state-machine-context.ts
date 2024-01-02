import { ConfigContext } from "../config-context.js"
import { PlayerContext } from "../player-context.js"
import { ViewContext } from "../view-context.js"

export type StateMachineContext = {
  player: PlayerContext
  config: ConfigContext
  view: ViewContext
}
