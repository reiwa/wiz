import { useInput } from "ink"
import {
  AnyActorRef,
  AnyEventObject,
  MachineSnapshot,
  NonReducibleUnknown,
  StateValue,
} from "xstate"
import { StateMachineContext } from "../engine/contexts/types/state-machine-context.js"
import { BattleViewEngine } from "../engine/engine/battle-view-engine.js"
import { GraphComponentBase } from "../engine/engine/graph-component-base.js"
import { GraphComponentWindow } from "../engine/engine/graph-component-window.js"
import { GraphView } from "./graph-view.js"
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

export const BattleView = (props: Props) => {
  const engine = new BattleViewEngine({
    config: props.state.context.config,
    player: props.state.context.player,
    viewport: props.state.context.viewport,
  })

  useInput((input, key) => {
    if (key.rightArrow) {
    }
    if (input === "w") {
      props.send({ type: "REST" })
    }
    if (input === "i") {
      props.send({ type: "OPEN_INVENTORY" })
    }
  })

  const component = new GraphComponentBase({
    width: props.state.context.viewport.windowWidth,
    height: props.state.context.viewport.windowHeight,
    children: [
      new GraphComponentWindow({
        x: 2,
        y: 1,
        width: 40,
        height: 10,
        children: [],
      }),
      new GraphComponentWindow({
        x: 10,
        y: 8,
        width: 40,
        height: 10,
        children: [
          new GraphComponentWindow({
            x: 4,
            y: 2,
            width: 12,
            height: 4,
            children: [],
          }),
        ],
      }),
    ],
  })

  return <GraphView texts={component.node.texts2d} />
}
