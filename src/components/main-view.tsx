import { useMachine } from "@xstate/react"
import { Box, useApp, useInput } from "ink"
import { RootEngine } from "../engine/engine/root-engine.js"
import { stateMachine } from "../engine/state-machine.js"
import { useWindowSize } from "../hooks/use-window-size.js"
import { AsideView } from "./aside-view.js"
import { GraphicView } from "./graphic-view.js"
import { MessageView } from "./message-view.js"

type Props = {
  mapText: string
}

export const MainView = (props: Props) => {
  const app = useApp()

  const [state, send] = useMachine(stateMachine, {
    input: { mapText: props.mapText },
  })

  const [windowWidth, windowHeight] = useWindowSize()

  const rootEngine = new RootEngine(send, {
    config: state.context.config,
    view: state.context.view,
    player: state.context.player,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
  })

  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      app.exit()
    }
    rootEngine.handleInput(input)
  })

  const blocks = rootEngine.getViewportBlocks()

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
