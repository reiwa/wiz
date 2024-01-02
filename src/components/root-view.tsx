import { useMachine } from "@xstate/react"
import { Box, useApp, useInput } from "ink"
import { ViewEngine } from "../engine/engine/view-engine.js"
import { stateMachine } from "../engine/state-machine.js"
import { useWindowSize } from "../hooks/use-window-size.js"
import { AsideView } from "./aside-view.js"
import { GraphicView } from "./graphic-view.js"
import { MessageView } from "./message-view.js"

type Props = {
  mapText: string
}

export const RootView = (props: Props) => {
  const app = useApp()

  const [state, send] = useMachine(stateMachine, {
    input: { mapText: props.mapText },
  })

  const [windowWidth, windowHeight] = useWindowSize()

  const gameEngine = new ViewEngine({
    config: state.context.config,
    view: state.context.townView,
    player: state.context.player,
    mapView: state.context.mapView,
  })

  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      app.exit()
    }
    if (input === "w" && gameEngine.hasEmptyTop) {
      send({ type: "MOVE", value: gameEngine.moveToTop() })
      send({ type: "DONE" })
    }
    if (input === "a" && gameEngine.hasEmptyLeft) {
      send({ type: "MOVE", value: gameEngine.moveToLeft() })
      send({ type: "DONE" })
    }
    if (input === "s" && gameEngine.hasEmptyBottom) {
      send({ type: "MOVE", value: gameEngine.moveToBottom() })
      send({ type: "DONE" })
    }
    if (input === "d" && gameEngine.hasEmptyRight) {
      send({ type: "MOVE", value: gameEngine.moveToRight() })
      send({ type: "DONE" })
    }
    if (input === "q" && gameEngine.hasEmptyTopLeft) {
      send({ type: "MOVE", value: gameEngine.moveToTopLeft() })
      send({ type: "DONE" })
    }
    if (input === "e" && gameEngine.hasEmptyTopRight) {
      send({ type: "MOVE", value: gameEngine.moveToTopRight() })
      send({ type: "DONE" })
    }
    if (input === "z" && gameEngine.hasEmptyBottomLeft) {
      send({ type: "MOVE", value: gameEngine.moveToBottomLeft() })
      send({ type: "DONE" })
    }
    if (input === "x" && gameEngine.hasEmptyBottomRight) {
      send({ type: "MOVE", value: gameEngine.moveToBottomRight() })
      send({ type: "DONE" })
    }
    if (input === ".") {
      send({ type: "REST" })
    }
    if (input === "i") {
      send({ type: "OPEN_INVENTORY" })
    }
  })

  const blocks = gameEngine.getViewportBlocks(windowWidth, windowHeight)

  return (
    <Box flexDirection="row" gap={1} overflow={"hidden"}>
      <AsideView config={state.context.config} player={state.context.player} />
      <Box flexDirection="column">
        <GraphicView blocks={blocks} />
        <MessageView config={state.context.config} />
      </Box>
    </Box>
  )
}
