import { Box, useInput } from "ink"
import {
  AnyActorRef,
  AnyEventObject,
  MachineSnapshot,
  NonReducibleUnknown,
  StateValue,
} from "xstate"
import { StateMachineContext } from "../engine/contexts/types/state-machine-context.js"
import { FieldViewEngine } from "../engine/engine/field-view-engine.js"
import { AsideView } from "./aside-view.js"
import { GraphicView } from "./graphic-view.js"
import { MessageView } from "./message-view.js"

type Props = {
  send(event: AnyEventObject): void
  state: MachineSnapshot<
    StateMachineContext,
    AnyEventObject,
    Record<string, AnyActorRef>,
    StateValue,
    string,
    NonReducibleUnknown
  >
}

export const FieldView = (props: Props) => {
  const engine = new FieldViewEngine({
    config: props.state.context.config,
    player: props.state.context.player,
    view: props.state.context.fieldView,
    mapSheet: props.state.context.mapSheet,
    fieldView: props.state.context.fieldView,
    battle: props.state.context.battle,
    viewport: props.state.context.viewport,
  })

  useInput((input) => {
    if (input === "w" && engine.hasEmptyTop) {
      const player = engine.moveToTop()
      props.send({ type: "MOVE", value: player })
      const fieldView = engine.moveEnemies(player)
      props.send({ type: "ENEMY_MOVE", value: fieldView })
      props.send({ type: "CONTINUE" })
      props.send({ type: "CONTINUE" })
    }
    if (input === "a" && engine.hasEmptyLeft) {
      const player = engine.moveToLeft()
      props.send({ type: "MOVE", value: player })
      const fieldView = engine.moveEnemies(player)
      props.send({ type: "ENEMY_MOVE", value: fieldView })
      props.send({ type: "CONTINUE" })
      props.send({ type: "CONTINUE" })
    }
    if (input === "s" && engine.hasEmptyBottom) {
      const player = engine.moveToBottom()
      props.send({ type: "MOVE", value: player })
      const fieldView = engine.moveEnemies(player)
      props.send({ type: "ENEMY_MOVE", value: fieldView })
      props.send({ type: "CONTINUE" })
      props.send({ type: "CONTINUE" })
    }
    if (input === "d" && engine.hasEmptyRight) {
      const player = engine.moveToRight()
      props.send({ type: "MOVE", value: player })
      const fieldView = engine.moveEnemies(player)
      props.send({ type: "ENEMY_MOVE", value: fieldView })
      props.send({ type: "CONTINUE" })
      props.send({ type: "CONTINUE" })
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
      props.send({ type: "REST" })
    }
    if (input === "i") {
      props.send({ type: "OPEN_INVENTORY" })
    }
  })

  const blocks = engine.viewportBlocks

  return (
    <Box flexDirection="row" gap={1} overflow={"hidden"}>
      <AsideView
        value={Array.from(props.state.tags.values()).join(",")}
        config={props.state.context.config}
        player={props.state.context.player}
      />
      <Box flexDirection="column">
        <GraphicView blocks={blocks} />
        <MessageView config={props.state.context.config} />
      </Box>
    </Box>
  )
}
