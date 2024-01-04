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

  const engine = new ViewEngine({
    config: state.context.config,
    player: state.context.player,
    view: state.context.fieldView,
    mapSheet: state.context.mapSheet,
    fieldView: state.context.fieldView,
    battle: state.context.battle,
  })

  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      app.exit()
    }
    if (input === "w" && engine.hasEmptyTop) {
      const player = engine.moveToTop()
      send({ type: "MOVE", value: player })
      send({
        type: "ENEMY_MOVE",
        value: engine.moveEnemies(player),
      })
      send({ type: "CONTINUE" })
      send({ type: "CONTINUE" })
    }
    if (input === "a" && engine.hasEmptyLeft) {
      const player = engine.moveToLeft()
      send({ type: "MOVE", value: player })
      send({
        type: "ENEMY_MOVE",
        value: engine.moveEnemies(player),
      })
      send({ type: "CONTINUE" })
      send({ type: "CONTINUE" })
    }
    if (input === "s" && engine.hasEmptyBottom) {
      const player = engine.moveToBottom()
      send({ type: "MOVE", value: player })
      send({
        type: "ENEMY_MOVE",
        value: engine.moveEnemies(player),
      })
      send({ type: "CONTINUE" })
      send({ type: "CONTINUE" })
    }
    if (input === "d" && engine.hasEmptyRight) {
      const player = engine.moveToRight()
      send({ type: "MOVE", value: player })
      send({
        type: "ENEMY_MOVE",
        value: engine.moveEnemies(player),
      })
      send({ type: "CONTINUE" })
      send({ type: "CONTINUE" })
    }
    // if (input === "q" && engine.hasEmptyTopLeft) {
    //   send({ type: "MOVE", value: engine.moveToTopLeft() })
    //   send({ type: "CONTINUE" })
    // }
    // if (input === "e" && engine.hasEmptyTopRight) {
    //   send({ type: "MOVE", value: engine.moveToTopRight() })
    //   send({ type: "CONTINUE" })
    // }
    // if (input === "z" && engine.hasEmptyBottomLeft) {
    //   send({ type: "MOVE", value: engine.moveToBottomLeft() })
    //   send({ type: "CONTINUE" })
    // }
    // if (input === "x" && engine.hasEmptyBottomRight) {
    //   send({ type: "MOVE", value: engine.moveToBottomRight() })
    //   send({ type: "CONTINUE" })
    // }
    if (input === ".") {
      send({ type: "REST" })
    }
    if (input === "i") {
      send({ type: "OPEN_INVENTORY" })
    }
  })

  const blocks = engine.getViewportBlocks(windowWidth, windowHeight)

  return (
    <Box flexDirection="row" gap={1} overflow={"hidden"}>
      <AsideView
        value={Array.from(state.tags.values()).join(",")}
        config={state.context.config}
        player={state.context.player}
      />
      <Box flexDirection="column">
        <GraphicView blocks={blocks} />
        <MessageView config={state.context.config} />
      </Box>
    </Box>
  )
}
