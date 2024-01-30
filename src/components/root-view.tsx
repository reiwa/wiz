import { useMachine } from "@xstate/react"
import { useEffect } from "react"
import { stateMachine } from "../engine/state-machine.js"
import { useWindowSize } from "../hooks/use-window-size.js"
import { BattleView } from "./battle-view.js"
import { FieldView } from "./field-view.js"

type Props = {
  mapText: string
}

export const RootView = (props: Props) => {
  const [windowWidth, windowHeight] = useWindowSize()

  const [state, send] = useMachine(stateMachine, {
    input: {
      mapText: props.mapText,
      windowWidth,
      windowHeight,
    },
  })

  useEffect(() => {
    send({
      type: "UPDATE_WINDOW_SIZE",
      value: state.context.viewport.updateWindowSize(windowWidth, windowHeight),
    })
  }, [windowWidth, windowHeight])

  if (state.matches("BATTLE_VIEW")) {
    return <BattleView state={state} send={send} />
  }

  return <FieldView state={state} send={send} />
}
