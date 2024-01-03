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
  /** @xstate-layout N4IgpgJg5mDOIC5QCUDyqAqA6AYgSQFEAZAEQH0A1QgdSwGFUBZRgQQDlyBlDFjAgYkaoKBANoAGALqJQABwD2sAJYAXJfIB2MkAA9EARn0BWAExYTATgDs+k+IDMANgvXxADgA0IAJ6IL7rAAWE0Crews3cUd7e31AgF94rzRMXEJSShp6JlYOMm5eAV4eOgBpCWkkEAVlNU1tPQRDU3NrWwdnV08fPyM3LAsQqxM3QLHbe0Tk9Gx8YnIqAloGZnYuHj5+VAAFAjYyPDYRNgxUZABNCu0a1XUtKsbTL18ER31HLHtAuLGjfQt9JE3FMQClZukFlkVrl1oUtrt9gw2PgAOJXKo3Or3UCNf6RLBGWL2EwxfTEqyhZ4GeziLAUlwA+xGQIWUyOEFgtLzTJLLBCEQkfhIjCHACqYik10Ut3qDwM+is-UsNjcXxC9kigSpTXE4gsQSGCvc-ziRg5My5GUWtH5BEFewIjHOZGKLDK6Lk0qxDQMzMCBNCtmcRnEY3ERm11g+fxcVkc0Vj+nNqTmVqytvtbEdzttHuqXruPqaxjMyvaTlj7m1+nD+sGoUccaiXysyfB3OtfOEdv4JBYrBREsqntqhblTT9AZsJmDocC4ertn64jxgMVuscCSSoItqchvIz-D2DFFJwIyDzmLHOIMrgJRJJD4pVmrIX6cYiYeCIzblv3Nu7QUWBIcgHSdS8C1lG8JzGKcg1ZOcFx6HUrCsAk8UGcQRkZSZt05PceVoMCc0AoVUBOMUhylUcoN0eUWjLOwKy6RcawNQJnECJl6WBPDdwhQisDAp0XQwEpSh7EhCAgmjsTopoXFpQkyUfFTn2rNx+hZFxG1GLi3GsLdphTATOz7AdJOkyUMUguTGjsXV7xU0lyUpZCSX6BlWU3NwTEBMkzT4kyOyyYiXRAnthUomSZTs303CMAkLHCJw-g4uwI2QmsTDQlcdNMVC4xnX8ACFiiIAhBOhNZ8g2AQCE4OgWF2GLvXHDyzGUjUxl8ji3Ecatvn9RwSRJUM2QS0rysqztqryApNmQU9WuveSSRGpzusCXrHH67U-nsLAHBcP4cppJiprEiqqpyGqFqKECyDmkgVto+z7GGTa9J2vasoVf0JhpD6V0JIyd1SMqrpmqEAAkWGQN0+GQJ7bvmurslWNG4TwPhGFeuKEBGQwsASixvgcIxNw1extV8-URuJL4qasPoTEujBrtmuGEboJGUcx2E+AxmFarhV13WskdYqLIn9BJowyZrJkqdVatwzlj7iXeIw2VQpMguwSGOeh3k6G5xHz35kX7uFu66qFdg6GIF0iCIfGZY1TqiW+kJdoGrLLH9NwwhnKxxD1vUwc5I3Odh+GLeR57RaFpP7odtgnbdyX81kmW3GJ0nyeV-SaeQsPDuwgyErDqx-EC4zDemqrzd5y3U-R9u4U4Uo8Fd932vzuXC6VymS8jGksAZvyTWSob2dj02W75zuhZxx0rbu4gCFbwUmoz4h++g2X5cVimVdLl5UP1CZfd1BX414husBjk3liXtvUcFggsDXxgN-mreO9+CcEARgQ+8lGZy2SsMBWCoayGH9i8XqR1wgGRGAZP2uEn4v2bvHVuidP7J2-jwZAg4MD5FAZFciIo2DinAY0VB+omSDEZFhPoqFIx2AJPnIwYRg7JRymzA2z8m5czwcvQhNsSFkIoRVIBJVkAEBYOUbOV43qIG+G8dCzJwyOHcPnRBBhQwa1iArAE3xmTEnnq-eg78CECyIVgbuvciD-y4JQ3ejsD6qNsnnAuCsi6j2prTfEN9Ro8JZI-cGjcoa4J5hIhxNtnGuzcbI7efBBQgLkeQ5JWdhw52luOSBAwPomFgTYFc7xOGJWOqMVkTgNQWGsXEhOqSbbi1KG04g2SexZPSWQaRBAwE+NzkUkkUDSnlPgVUrK406QGWSg-UwHFmliPiR-RJ6MOldNdukyKXi8nUUKUfQeJ9AnnzVo5YOsR4xYV6vXaJIjYlrNaSvb+uS0lAL6bzAZ8MyH0MQMwj4+cTCgrGIEP4L5kKDBqaglkhJogGVWXHdZ9jrbo1-p8jJwDQG-NIUMgFCAgUk1sGC34CpaYhBQREQYmkLCYORbyBqTVdhkEUZwUURAMDANFHQJ2do7SEpnL5LAcC6WWGDoYpowQ5bHXpRSUOsQhHYNEaFRqzVKrss5dynALBe6CpGcctau0zBirQREOM1YnBexcO8fwoKXCMtoEtNgbBDgoltgAnpgoswAA1hn5LUQTMpsRJ6UwVrEZKepWTVkGBXKIOtFR2HzpNYRODOwurdWwD1SdmrbCIIQH1BB-VCtGHLOISsOJawVFCl4-wSTmATbw3yxpU0queVkTN7rPXkC1VysiFFaFURsqM6CsRYIcXrLWXa6VY3vHmYpGII1LBWLTaq3kXbs09rZQ1bV-AFFKJUYG3xRSbmTxDcyfwNIKTaiYmhQkER4xhEVLtKJ0d11EXVayvtOTeX8pID2P1AajltSPu8NCXE4wJUfNtaIt73j9Aff1RsH1+r9SdUJL9mrd1crIPgXZRaS2GtA2tGtQQPq7VMDEWDF9EDT2XOEZKLh+oqiwY89NWQcE-oHTQuhxHVr2TXORqDVGvj9Vo00YY0ZGHfFQppZV7GP1PONjujl-bqCHEJU4BwJKcq+UZlhL4t6HD9E1uHEa1hMJvotBx3kXGcPcqIKgEBWm9GHRBUmgzJItRZUsyTMIbDUJidVBhlgBaRD8CA1p2uw09SEk0jXFUxmNSfAC0VSzyaMMAeApF4twGR1GoYZEWVipgjhvnDw2Ntd-PnV4WEbaIXhFgn4IcHGhKyRaQ+ttVk1gDLBKym5o6jI-IQt8mHBTnJDjHFOBcLAOw9g4uye1kVfxKYzn+Aq1bVrkok2+NenWvkGa-im3sGb5w5sInTpnQlFIamTusBqYwlNa2+j8kdcOZM9F+XVBNi0J2ThnHO5i752LRQuf4+ohAoR3z0sfaGPUzgpVxEcmU2uh2IVPqacI-7Z2f64yxfs-ehyCskcaLdo692+FPcbIufEjZQg0giPWspx2jincB3j9eYPLLDqlqTxALM7udCpzrGnWV5wfHp44OrMRw6rqfjjjnmLue72odFCHBNBcU+F490XL2mjjNFRSaXQXr2ru3BoeQEA4DaDBCBgTiAAC0FhtSO6pbqXU7wZy8LeIqX8BFrT28h-wxtxIHuhDDrtbU0v+hlq4sYvb-x-emShJIuqQeCaDDQkxZULZI-dEvv4XbyPVTxk6A8-CKeDyAQz0WMk84gigz8iGDUVdIyoUng4CVZSASEgr-xEKTKswiQzLX8cZNs-52CKhFk8YXBq3jO9oE1zjDhGT4Poiw+RIdLtGP6CCocp0hDP9AJZJ2+5X+FGBMbR9ZPwD1kcyLBBwkD3-JBU0QBgQosX0L4vCfN1qXHQgiEiDLzDn72CjTCH2zHCgAxfxJwd0k0PxZhXFu0VgkxHk72JAhVNH+A1CdVf0Ez1GE0oxg3E21Ee2pQe2JHGhynZDXQ7VNjT0KAILo2MAgwo2g2ozIPF0cinjJDeHaD93oJUxeXwTaXT3gMhxDXfBN0MBrFuylTeESkVEfT6DYJJCx3bREJRVeSYJTj0IIBYMJj6A+DjF4TkPDgx04TQliDMPLzynAJiW0MXnEQ2XRUKE5z-lTg8SMMDkSm92h1sBUJZkpX9CQzeE+1Sk0MUwYLflcLRTtg8MGRyR8MkIJg+kGCN21jyk0nfzViZCCDiH6j8np2sF+whiUzNniPEI8I+W8O9V8LJn9BXDYTsFBU3CQheBhXvGANDFrjDjJgwyqNRRqKFm2XqIaLSJlkWXPQayZBGzJjVg4nMCrmfDh0cOUwXjiJGLeScR7hSRB13ymKKVk1aAfhZF9gVmqR6M0j6NcEGOEK2NsWqN2OB1SL5wQK+AVDOJnXrGlxd2QmQXCP+CrX+Iw2ZQ1VU21V8JDFhTJGaAcBpDiEGmMFFVGhpAhWFQ2Ns2dVPCzRRF8JnDMEGDsBZgZzQw0ksBWMMgSnDjKWxKU03RzUkXeIKX50JliFpBJPDmZD4Sj18wbUj0TRbRTQZNiKwCZO3TzQLSOI+KkOiESmRwiC+C4P0FjUFKbSTVbTFOcNxNdW7STh-UaNghGmZDfGGG0kyjrTjTpE1JFMBB1KeIhO-Qc3yD-QIAFTgLlODVVBsImGMBhXBSRxlR6Lrh0T1CiHBKwyhNw3wwqi9LZIQJynpW1zRzKIS3134MOjlUVEVD6wiAw3szUwwCMLVCYTJNsBOhrDGGSzMAxw1HDAMSZCjhsyUzCzwBEFLOcDQmME3FoIQWDn-zoxMxq3M2VEwkdJsToCcxAQTKDSLHCFDAJBGh4QMjGGiAkzvXPS1mBhLGswqPFOyznJPTHTAM+HvjKSUJrGZFjXxE1jiFZA4g-H3OwDt2OOgmCGrEG1gR73MIsw2KPN8KCOIM4LEzg3cnCCCAZFHl8n8hWWxzZwBwuFLIBLrRpA+C+NMRb0BGiFZ2mw53mzYCMODmrFWyG3aH8EDGsDwvZ1mzeMmO9IXJ0wcCXAdIiKvW239C+JCGey9wVBoqQqB3xxVyMPMLDWiF2lSlVHnx4NpBZlrlJIViwlbGESRFRCAuJFFUjjDhXBbSHNeEOm0msGbWSmRxUqfjUrwGZM2WYPfNI1CW0s9z0tIq5IZF0jGEaQBESESCAA */
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
      dungeonView: new DungeonViewContext({
        floor: 0,
        x: 0,
        y: 0,
      }),
      mapView: new MapViewContext({
        mapText: props.input.mapText,
      }),
    }
  },
  initial: "FIELD_VIEW",
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
                return { townView: props.event.value }
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
})
