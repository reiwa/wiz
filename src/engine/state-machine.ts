import { nanoid } from "nanoid"
import { assign, createMachine } from "xstate"
import { CharacterContext } from "./contexts/character-context.js"
import { ConfigContext } from "./contexts/config-context.js"
import { DungeonViewContext } from "./contexts/dungeon-view-context.js"
import { MapViewContext } from "./contexts/map-view-context.js"
import { PlayerContext } from "./contexts/player-context.js"
import { TownViewContext } from "./contexts/town-view-context.js"
import { StateMachineContext } from "./contexts/types/state-machine-context.js"

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
      townView: new TownViewContext({
        playerX: 0,
        playerY: 0,
        viewportX: 0,
        viewportY: 0,
      }),
      mapView: new MapViewContext({
        mapText: props.input.mapText,
      }),
      dungeon: new DungeonViewContext({
        floor: 0,
        x: 0,
        y: 0,
        enemies: [
          new CharacterContext({
            id: nanoid(),
            name: "スライム",
            symbol: "S",
            x: 8,
            y: 8,
            lifePoint: 4,
            maxLifePoint: 4,
            experiencePoint: 2,
            cooldownTime: 1,
            maxCooldownTime: 1,
            attack: 2,
            maxAttack: 2,
            defense: 2,
            maxDefense: 2,
            magicAttack: 0,
            maxMagicAttack: 0,
            magicDefense: 0,
            maxMagicDefense: 0,
            dexterity: 1,
            evasion: 1,
            humanity: 4,
          }),
        ],
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
