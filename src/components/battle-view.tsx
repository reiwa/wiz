import { Box, useInput } from "ink"
import {
  AnyActorRef,
  AnyEventObject,
  MachineSnapshot,
  NonReducibleUnknown,
  StateValue,
} from "xstate"
import { StateMachineContext } from "../engine/contexts/types/state-machine-context.js"
import { BattleViewEngine } from "../engine/engine/battle-view-engine.js"
import { AsciiView } from "./ascii-view.js"
import { BattleCommandView } from "./battle-command-view.js"
import { BattleStatusView } from "./battle-status-view.js"

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

  useInput((input) => {
    if (input === "w") {
      props.send({ type: "REST" })
    }
    if (input === "i") {
      props.send({ type: "OPEN_INVENTORY" })
    }
  })

  return (
    <Box flexDirection="column" overflow={"hidden"}>
      <AsciiView sprite={engine.battleView} />
      <BattleStatusView config={props.state.context.config} />
      <BattleCommandView config={props.state.context.config} />
    </Box>
  )
}
