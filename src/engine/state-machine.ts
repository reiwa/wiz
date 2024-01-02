import { assign, createMachine } from "xstate"
import { ConfigContext } from "./contexts/config-context.js"
import { PlayerContext } from "./contexts/player-context.js"
import { StateMachineContext } from "./contexts/types/state-machine-context.js"
import { ViewContext } from "./contexts/view-context.js"

export const stateMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUDyqAqA6AwqgsvgIIByAIgPoDKGRGAogMT6oBq9A2gAwC6ioABwD2sAJYAXUUIB2-EAA9EAZgCMAJiwAWTQFYdAThUAOLvoDsStZoA0IAJ6J9XLDrVnzZzSoBsRnVx0AX0DbNEwsFnYKPEJSSmQAVRISAEkSAHFGMlQSTl45YTFJGTlFBHczLDMVJU19TSUlavVbBwQVPSw1NSVvC28lE1ddYJCQaSEIODkwjAKRCSlZJAVEFXcsPyMjFX1vJ28ub001VuUsLjdzJr8lLjMdIzNg0PRsGOJyaloGeaKl0qIbqVLY7PYHI4nM4INSHC5mLhcIz6R73AxGF4gWYRNj0aIET7xJKpDJ-RYlFZlTRmEEmIzUix1bxuaGw5z3RHI1EPfQY0ZAA */
  id: "ROOT",
  types: {} as {
    context: StateMachineContext
    input: {
      mapText: string
    }
  },
  context(props) {
    return {
      player: new PlayerContext({
        lifePoint: 16,
        experiencePoint: 0,
        x: 16,
        y: 8,
      }),
      config: new ConfigContext({
        windowGap: 1,
        leftWindowWidth: 32,
        bottomWindowHeight: 8,
      }),
      view: new ViewContext({
        mapText: props.input.mapText,
        playerX: 0,
        playerY: 0,
        viewportX: 0,
        viewportY: 0,
      }),
    }
  },
  initial: "COMMAND_STATE",
  states: {
    COMMAND_STATE: {
      description: "コマンドを受け付けている状態",
      on: {
        MOVE: {
          target: "MOVE_COMMAND_RUNNING",
          actions: assign((props) => {
            return { player: props.event.value }
          }),
        },
      },
    },

    MOVE_COMMAND_RUNNING: {
      description: "コマンドが実行されている状態",
      on: {
        DONE: {
          target: "COMMAND_STATE",
        },
      },
    },
  },
})
