import { AnyEventObject } from "xstate"
import { z } from "zod"
import { ConfigContext } from "../contexts/config-context.js"
import { PlayerContextAction } from "../contexts/player-context-action.js"
import { PlayerContext } from "../contexts/player-context.js"
import { ViewContext } from "../contexts/view-context.js"
import { BlockEngine } from "./block-engine.js"

const zProps = z.object({
  config: z.instanceof(ConfigContext),
  view: z.instanceof(ViewContext),
  player: z.instanceof(PlayerContext),
  windowWidth: z.number(),
  windowHeight: z.number(),
})

type Props = z.infer<typeof zProps>

const mapCache = new Map<"current", unknown>([])

export class RootEngine {
  readonly config!: Props["config"]

  readonly view!: Props["view"]

  readonly player!: Props["player"]

  readonly windowWidth!: Props["windowWidth"]

  readonly windowHeight!: Props["windowHeight"]

  constructor(
    private send: (event: AnyEventObject) => void,
    private props: Props,
  ) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get viewportWidth() {
    const borderWidth = 2
    const padding =
      this.config.leftWindowWidth + borderWidth + this.config.windowGap
    return this.windowWidth - padding
  }

  get viewportHeight() {
    const borderWidth = 2
    const padding = this.config.bottomWindowHeight + borderWidth
    return this.windowHeight - padding
  }

  get mapWidth() {
    const [firstLine] = this.view.mapText.split("\n")
    return firstLine.trim().split(" ").join("").length
  }

  get mapHeight() {
    return this.view.mapText.split("\n").filter((t) => t).length
  }

  get fullMap(): string[] {
    if (mapCache.has("current")) {
      return mapCache.get("current") as string[]
    }
    mapCache.set("current", this.#loadFullMap())
    return mapCache.get("current") as string[]
  }

  #loadFullMap() {
    return this.view.mapText.split("\n").flatMap((row) => {
      return row.split(" ").join("").trim().split("")
    })
  }

  getBlockValue(x: number, y: number) {
    return this.fullMap[y * this.mapWidth + x]
  }

  getBlock(x: number, y: number) {
    const engine = new BlockEngine()
    return engine.getBlock(this.getBlockValue(x, y))
  }

  getViewportBlocks() {
    // ビューポートの中心座標を計算
    const halfViewportWidth = Math.floor(this.viewportWidth / 2)
    const halfViewportHeight = Math.floor(this.viewportHeight / 2)

    // ビューポートの左上の座標を計算
    const startX = this.player.x - halfViewportWidth
    const startY = this.player.y - halfViewportHeight

    // ビューポート内の各ブロックを更新
    const viewport = Array.from({ length: this.viewportHeight }, (_, y) => {
      return Array.from({ length: this.viewportWidth }, (_, x) => {
        const mapX = startX + x
        const mapY = startY + y
        // プレイヤーの位置
        if (x === halfViewportWidth && y === halfViewportHeight) {
          return "@"
        }
        if (
          mapX >= 0 &&
          mapX < this.mapWidth &&
          mapY >= 0 &&
          mapY < this.mapHeight
        ) {
          return this.getBlockValue(mapX, mapY)
        }
        // マップの外
        return "0"
      })
    })

    return viewport
  }

  handleInput(input: string) {
    if (input === "w") {
      this.moveToTop()
    }

    if (input === "a") {
      this.moveToLeft()
    }

    if (input === "s") {
      this.moveToBottom()
    }

    if (input === "d") {
      this.moveToRight()
    }

    if (input === "q") {
      this.moveToTopLeft()
    }

    if (input === "e") {
      this.moveToTopRight()
    }

    if (input === "z") {
      this.moveToBottomLeft()
    }

    if (input === "x") {
      this.moveToBottomRight()
    }

    if (input === ".") {
      this.send({ type: "REST" })
    }

    if (input === "i") {
      this.send({ type: "OPEN_INVENTORY" })
    }
  }

  moveToTop() {
    const block = this.getBlock(this.player.x, this.player.y - 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToTop() })
    this.send({ type: "DONE" })
  }

  moveToLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToLeft() })
    this.send({ type: "DONE" })
  }

  moveToBottom() {
    const block = this.getBlock(this.player.x, this.player.y + 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToBottom() })
    this.send({ type: "DONE" })
  }

  moveToRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToRight() })
    this.send({ type: "DONE" })
  }

  moveToTopLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y - 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToTopLeft() })
    this.send({ type: "DONE" })
  }

  moveToTopRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y - 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToTopRight() })
    this.send({ type: "DONE" })
  }

  moveToBottomLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y + 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToBottomLeft() })
    this.send({ type: "DONE" })
  }

  moveToBottomRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y + 1)
    if (block.isWall) return
    const engine = new PlayerContextAction(this.player)
    this.send({ type: "MOVE", value: engine.moveToBottomRight() })
    this.send({ type: "DONE" })
  }
}
