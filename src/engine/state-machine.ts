import { nanoid } from "nanoid"
import { assign, createMachine } from "xstate"
import { ActorContext } from "./contexts/actor-context.js"
import { BattleContext } from "./contexts/battle-context.js"
import { ConfigContext } from "./contexts/config-context.js"
import { DungeonViewContext } from "./contexts/dungeon-context.js"
import { FieldContext } from "./contexts/field-context.js"
import { MapSheet } from "./contexts/map-sheet.js"
import { StateMachineContext } from "./contexts/types/state-machine-context.js"
import { ViewportContext } from "./contexts/viewport-context.js"

export const stateMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCUDyqAqBiAqgBQBEBBDAUQH0B1ASQDkDVLyBlagLVIG0AGAXUVAAHAPawAlgBcxwgHYCQAT0QBaAEwAWAHTcd3AMyqAjAFZjANkM6AHGYA0IAB6J16s8e1nVqq9zPcrVoZmAL7B9miYmgBi1KQAMgTkAGqxlJoAwqgAsllE9CwYJKRYWahJXHzyIuJSsvJOCIYmqpqqAJwA7Iaq+mZtnf72Sght-prqGh16bT5menqG6qHh6BjRsQnJqRnZufnMhWRYJIXpANI8-Egg1ZLSctcNTcYt7V09en0DVkOIbcZWTRtSbeFzqbp6ZYgCJrGLxRIpUhpTI5PKJA5FLCoPCkWjkOjlWgYVDIACalyqojudUeiBevwQFjMmj04LBxkMbUMPisUJh63hWyRO1R+0OxWxuPImVoMQA4hTrrdag9QE8ZtxNMYFgZ5oYDB11B0GfrNYb+ly9MZ1P9VCEwtDVgLNoi0qVygQsDKMHQcBUrkIqSr6ogmh1AW9uayNHofOoTTo2uNJoYOv5OYtjHynXCXdt3aRPbjSFlSeQTkRzorAzV7iHGtatNb3n1jNwXNxjAzOsyOf0OmY5v3DNnIrmEfmyoWsMXS+QC9WbkG67TGs1Wp1ur1+4NFKHO0ngUazAPfKyOqPYRsJ8KC57iLk5f7KbWaWrQ42tUbuq32+pOya3SAtwnKBFY4Y6GYSwOvy45Cm6U5FrQmQ4ESpDIIuyoru+jQDFqOqqHqBpGiaGiAgOMwdhM3iXs6N4IR6xwEIks7kpUSrLm+jgfi4X4tv8f4AXujTcB0HRaqBwLcN4lqQjBObXvBmisfOiFeqgRK+s+HGvqq3Fri8G7vNu3yAZYyauG06hWuavLyWOimusptAlnOFbnNOBCxJhnF6eqoz4fqhEEYaxrCdygI2v0J5WC4sadNBKwOYKTkPkQT73t57E1tSfmID0OiBbqIUkcJhGAha-xQVYRiBFatFwU5KlEMx07elpPm6fWJhWO4xhtNMnwcq4PRduF0niSB0UvGJA52rRABCJxxBQTkons6LijOzDpEQOKdbl9blS02r6rF6g1a4NgmmymieLq7YvGYvWLctq3bOtaIFJiyCoQdwaroRnhFedl3PXYwkcno2jTP83RTNJ+ivRgGArUpn1ipiLWJBjBD-dh+mER0J06qDGjg4BhqaBCej6GmJissjqPvcK6QABJEMglZkMg0q7F9GJkCKG3fUc1BkFk+NcQ03hNJovVWZYVpQbGegMjVSb3YRrjWR0AKqEzaNrRzXPpDzfOiptRTCwLW3uRc2VLl1gOBIY8v9eC+jmNZVhq+NHIslMRhuE9YkjvZaxLSjRsfSb3PoRbIuC6QNuY0cu3IfE5ZxHEUt5Qgx0gy4YPXeF7RaOBBgnqJXTcFZhss8icdmwnuOiynbfJ16eTpPEedHa77uK17Ku+wyabQzJVgzMYaYdKMWYR5oUfM+jzfm534qp1bRzMGc1A5-3LtywrnvKz7fvDANmpa00XIDWyDdr5z8e85v1viyWicC-EpAt56Gde650dlhaW+VB6nyVt7VW4957U0IuTHQ-VBx2SSpHN6z9TYb35mnFOn8sjf32L-f+WBmDEIwEfHCuo3YDWJv1VMlgmgQ2GJdGGMxgQBDaODOSaDl4YONi-Fub8cE7xToUZAT4MAsHIW1DSPpaB+kofpaY08WT9XaKaVQAIxLdh6FqQIs9YzzwNAbJeK8Y6s3Xq3ER7dNDiMkdIlaJCFrIFIEQB2AYnaHVXOCCwElrSdj8AEIICZwQsgWP1Lk4JrQGCfgIrB1jLa2L3gfOIhD0QyIAT3PuIDfIDxPh7KBo9L6IACJqCEXgDAGJtKgx0kRzGNwyFY4RSTk6aBSTndJji-5kE9GQpxUiOnAM8aA-O1CgR6DoVyWuTDdHuH0JRf4nx4pxNjoI7BrSt72y6f0gZ05+k9PIPY0gFDcnOyoYRGhkytHTMYSE8a6h3Dhn6J8Z6LxXCrMsesxJSctko0rGcHZ8Q9lZMzsMl83icKyzdpAkeF8EyFUrkEPw3gNCL14Q0zBr8dlbyGd0khByzZHM5pIpRDQrRcPlt0Lw7JUxzLYbFJZcxp6fKbt8lpvyP4S3xb00h5DiUSJOWSxAFLmSBC8BoFwHIwosI0Ayjh09uGsuUjtPaFBXHMBwHEbAmr0i90LIWYVBdnotAYZw9o4FmGhgmG7BZXDDR2imN0ZVpBVU4nIBqrV2AohEAPoas5kLCYmupl0c1MwBwmk+CTfoQRRheH6Mq36tBaB0DlNvHl04XIAA1TkjLyYDU6d1zD9QWNffoY1hickIq0Xwphww9DAuiup6Do6NKTSm2gaa257TwHEWInps25ohQDKFsU3aLCVq4AwYYZWhmBJPWts8arphemY-h2x22pvTZ67V6lNIKO0jlEdyjFhaEshoA8z0Romi5MyZ5ox5ieHaLEtdralKbs7du11XqsAuLcR44dBNyULGZJ4bU1oH2iXjGVOm+EZiDimOGZ6tT+SYqam69V37tUsBwHq0gBqB2kBzUa4O4ldZvOChdOYDJg6Am1PBk8kybA2BdRhj1WGpExBzpmojQ6dKBplqmMjkyKPzCoyUguTRgKw1hjYUNPDm18LfU5TFO7sDtQPSR7kwmBy9UozYCTqY7RwenuCMSARTEYvXcKVTHGsA0FoEaz4+gqWqHrQ9bWNH9CAkmbTOanQpIoadGh7YtnNW7riKgMhTm-DQ3Fe5wi0lWQ3rgZXaSs8pgXV9sqogfbyhYEHU5+eWg-BLICHPUNXnYyBz854ALDblUEDcYR4jAbj3kp8La8MExi3-gMSlpMaWtFiVZAEBT-IYRYDoOLI1Z1xiTIuv8To08YHhVi9oS0RhHk1TTJZxTBJcTEjJJoSUtA+UDNmzVfxngLAJS0SYSNA15bgj86YGq91aIHaJCSUkJ2cRncATkvN5z9KGnmZZTosYTDmFnQ2Iw2hRJWRRd0aye3+RfaO79-BGbPQ4Gi21oDzhwyaHnn0Gw7Y659CtY0f8mphszDtI8hDbRPu0EJJjzQ2PCW8sB+C-j7XEBg+0BDqYBiYeAR8HdUKtMZhVq0az9nP3Ofcrx55LKwOBOC9MMLr4ovocnhur4KXrgMvzFEi+3hGOlfY9VwAuRHUCdgIQHrcHuuoemAN2XBYIaTcjb8y+h0MhhAQDgPIGEgGnfKDaAyNQ0NKrSR-EeR5iVFONVSBH-O4EkwfDeOeNMz0GRuEBGOq0No7QvAt6nxyH0bHJwz-WYE4kc+Q6NPnn4wl56ajHX115Xwm2wWr7eRC9fVz6n-OMbUNq2yxmnu3q+Yk7r6AtTchm-eFIpW2CpO8I+cJWSb4ECYYkbSDn6AmQcCOeRIvow1QfaRZxuX+R5AgO-9JGfEnrECYPFYSc6JNTkPYhxNxw5eE09hQ0oMoX8ngBw49k9odfZHlDRAJvAJIZhZgENOwb8N9hRmpWpn9+dCdGhiZ382xUxHlv8EwrRF8DBHlMxORYxWVID8pLAkxyM9MxMDMGQod5VwwqlrIuFlV34yBGDJNZ55tdMK9RtqNwpac7oEF9QLAtxwwBDmkcUihhCtFqsBxZ4mhLAwdqcLAnlZ9Hk3M75-hlD2VVChZBDSB1CAQ703AugmgoNzBdFxIFgtC+8po196lrM2UEkOVbYuUv5O5Ml1CrJ3By8jR4tp49Z1Y5V6MbBOQp03AWdX1V54lsVrC7ESUTkcdhDJlgQQ0ggSDUDUxqcoFxhFgbBSMbRiZzD-DLCU48UQiQUwjeIQJ0segvAoIhIr4tETM4x540x640iLE-DMja8-lThAUWjWj8Cndn1QMyJfYXhFgrJQlmQp5Qp4MMDRjGl2YLCsi8VudCx8izMNwUEy8Tdo9hJgQ+oVFBiBgRirNlM1kGisiudQj5ixlzj2hLijwUi4imwVFbtkj+pWNdp3U1NbDOwYZ9Rnh9BaZFgboTB4EHpjC3lE1UIO05R1C7QWhgQeg9YjRYwC9woNYNxrAT9AkZgsTk0t0WielTjvijoFhNRCTRJmxSS5851q18861l1G06ScT00e0+1mSj0CC7RKDFg654D2DDAb0+TF160V1vCW10iN1sSGSbFoSWTAYrISstEJgLpiYooK1eToZ+Sl0G1uR1SlNNTsC2M1McM8MCN1DfY3CIQTA7iwRyibU4MF4Ak65fAIS1V2NwtONUkJSvEBcC5Scdd54YjvBwJYd5DoY7VwxwwVtaS9ilIwsvUzj2hA5rRuhy1LAXAqsWgmdYxOxAg5hrQcs8sbD9SqE+hxITAoI3MFDnpECYNqs0t-N55RoBDIsyE8DJSndph2wtRPADFTMp0JMPhxJb5JkQIXggsfDXiwDmt8i0x3BRUtEDDLBrQb1JdfM1jrQTwydaJw9Wz9IJgTR1t6EbltC6t7SmsWp1D4YxDRNJClzphxgLRvYapuRFh7RLc2dDsft8ibjK1aZmRWRuhrQtE5NFgFdoLjtTthDwITQOR5kuQehRhvxOgMLvtjtPi5jJyxkXN9AgI7TbsH1HstAkK0UTwggjALwl4rcKKVdxzhDtCi05hnohpfZT9pDCo9ZhzOS40uLeEZR5RvyDBqY64jQdBuQehoNhg5gtRdAqltEDRxsnQFLqAu1Ji1D7zBNJdmC1KQJl0tKPx2SLQYo4pp4uRQhQggA */
  id: "ROOT",
  types: {} as {
    context: StateMachineContext
    input: {
      mapText: string
      windowWidth: number
      windowHeight: number
    }
  },
  // initial: "FIELD_VIEW",
  initial: "BATTLE_VIEW",
  states: {
    FIELD_VIEW: {
      description: "フィールド",
      states: {
        COMMAND_STATE: {
          tags: ["COMMAND_STATE"],
          on: {
            MOVE: {
              target: "MOVED",
              actions: assign((props) => {
                return { player: props.event.value }
              }),
            },
            ATTACK: "MOVED",
            OPEN_INVENTORY: "#ROOT.INVENTORY",
            OPEN_CONFIG: "#ROOT.CONFIG",
          },
        },

        MOVED: {
          tags: ["MOVED"],
          description: "動いた",
          // entry: ["ENTRY"],
          on: {
            CONTINUE: "COMMAND_STATE",
            ENEMY_ATTACK: "ENEMMY_ATTACKED",
            ENEMY_MOVE: {
              target: "ENEMY_MOVED",
              actions: assign((props) => {
                return { fieldView: props.event.value }
              }),
            },
            DAMAGE: "DAMAGED",
            ENCOUNTER: "#BATTLE_VIEW",
            ADD_ENEMY: "ENEMY_ADDED",
          },
        },

        ENEMY_MOVED: {
          on: {
            CONTINUE: "MOVED",
          },
        },

        ENEMMY_ATTACKED: {
          on: {
            DIE: "#ROOT.DEAD",
          },
        },

        DAMAGED: {
          on: {
            DIE: "#ROOT.DEAD",
          },
        },

        ENEMY_ADDED: {
          on: {
            CONTINUE: "MOVED",
          },
        },
      },

      initial: "COMMAND_STATE",
    },

    BATTLE_VIEW: {
      id: "BATTLE_VIEW",
      description: "コマンド式の戦闘",
      states: {
        COMMAND_STATE: {
          on: {
            ESCAPE: "ESCAPE_RESULT",
            RUN: "RUNNING",

            ADD_COMMAND: {
              target: "CHARACTER_COMMAND_STATE",
            },
          },
        },

        CHARACTER_COMMAND_STATE: {
          states: {
            COMMAND_STATE: {
              on: {
                ITEM: "ITEM_COMMAND_SELECTED",
                ATTACK: "ATTACK_COMMAND_SELLECTED",
                CANCEL_ALL: "#ROOT.#BATTLE_VIEW.COMMAND_STATE",
                CANCEL: "#ROOT.#BATTLE_VIEW.CHARACTER_COMMAND_STATE",
                SKILL: "SKILL_COMMAND_SELECTED",
              },
            },

            ITEM_COMMAND_SELECTED: {
              on: {
                CANCEL: "COMMAND_STATE",
                SELECT: "ITEM_SELECTED",
              },
            },

            TARGET_SELECTED: {
              on: {
                CONTINUE: "#ROOT.#BATTLE_VIEW.CHARACTER_COMMAND_STATE",
                BREAK: "#ROOT.#BATTLE_VIEW.RUNNING",
              },
            },

            SKILL_COMMAND_SELECTED: {
              on: {
                CANCEL: "COMMAND_STATE",
                SELECT_SKILL: "SKILL_SELECTED",
              },
            },

            ATTACK_COMMAND_SELLECTED: {
              on: {
                SELECT_TARGET: "TARGET_SELECTED",
                CANCEL: "COMMAND_STATE",
              },
            },

            SKILL_SELECTED: {
              on: {
                SELECT_TARGET: "TARGET_SELECTED",
              },
            },

            ITEM_SELECTED: {
              on: {
                SELECT_TARGET: "TARGET_SELECTED",
              },
            },
          },

          initial: "COMMAND_STATE",
        },

        ESCAPE_RESULT: {
          on: {
            SUCCEEDED: "ESCAPE_RESULT_SUCCEEDED",
            FAILED: "ESCAPE_RESULT_FILLED",
          },
        },

        RUNNING: {
          states: {
            COMMAND_SELECTED: {
              on: {
                NEXT: "COMMAND_APPLIED",
              },
            },

            COMMAND_APPLIED: {
              on: {
                NEXT: "COMMAND_RESULT",
              },
            },

            COMMAND_RESULT: {
              on: {
                CONTINUE: "#ROOT.#BATTLE_VIEW.RUNNING",
                BREAK: "#ROOT.#BATTLE_VIEW.BATTLE_RESULT",
              },
            },
          },

          initial: "COMMAND_SELECTED",
        },

        ESCAPE_RESULT_SUCCEEDED: {
          on: {
            NEXT: "CLOSED",
          },
        },

        ESCAPE_RESULT_FILLED: {
          on: {
            NEXT: "RUNNING",
          },
        },

        BATTLE_RESULT: {
          on: {
            CONTINUE: "COMMAND_STATE",
            WIN: "ALIVE",
            LOSE: "DEAD",
          },
        },

        ALIVE: {
          on: {
            NEXT: "CLOSED",
          },
        },

        CLOSED: {
          type: "final",
        },

        DEAD: {
          on: {
            NEXT: "CLOSED",
          },
        },
      },

      initial: "COMMAND_STATE",
    },

    ROOT: {
      on: {
        INIT: "FIELD_VIEW",
      },
    },

    DEAD: {},

    INVENTORY: {
      states: {
        OPEN: {
          on: {
            SELECT: "ITEM_SELECTED",
            CANCEL: "#ROOT.FIELD_VIEW",
          },
        },

        ITEM_SELECTED: {
          on: {
            USE: "ITEM_USED",
            CANCEL: "#ROOT.FIELD_VIEW",
          },
        },

        ITEM_USED: {
          on: {
            DIE: "#ROOT.DEAD",
            CONTINUE: "#ROOT.FIELD_VIEW.MOVED",
          },
        },
      },

      initial: "OPEN",
    },

    CONFIG: {
      states: {
        COMMAND_STATE: {},
      },

      initial: "COMMAND_STATE",
    },
  },
  on: {
    UPDATE_WINDOW_SIZE: {
      actions: assign((props) => {
        return { viewport: props.event.value }
      }),
    },
  },
  context(props) {
    return {
      player: new ActorContext({
        id: nanoid(),
        name: "@",
        symbol: "@",
        x: 18,
        y: 14,
        direction: "RIGHT",
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
      config: new ConfigContext({
        windowGap: 1,
        leftWindowWidth: 32,
        bottomWindowHeight: 8,
      }),
      viewport: new ViewportContext({
        viewportX: 0,
        viewportY: 0,
        windowWidth: props.input.windowWidth,
        windowHeight: props.input.windowHeight,
      }),
      fieldView: new FieldContext({
        enemies: [
          new ActorContext({
            id: nanoid(),
            name: "スライム",
            symbol: "S",
            x: 8,
            y: 8,
            direction: "RIGHT",
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
      dungeonView: new DungeonViewContext({
        floor: 0,
        x: 0,
        y: 0,
      }),
      mapSheet: MapSheet.fromMapText(props.input.mapText),
      battle: new BattleContext({
        commands: [],
      }),
    }
  },
})
