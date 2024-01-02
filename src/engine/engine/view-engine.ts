import { ConfigContext } from "../contexts/config-context.js"
import { MapViewContext } from "../contexts/map-view-context.js"
import { PlayerContextAction } from "../contexts/player-context-action.js"
import { PlayerContext } from "../contexts/player-context.js"
import { TownViewContext } from "../contexts/town-view-context.js"
import { InkEngine } from "./ink-engine.js"

type Props = {
  config: ConfigContext
  view: TownViewContext
  player: PlayerContext
  mapView: MapViewContext
}

export class ViewEngine {
  readonly config!: Props["config"]

  readonly view!: Props["view"]

  readonly player!: Props["player"]

  readonly mapView!: Props["mapView"]

  constructor(props: Props) {
    Object.assign(this, props)
    Object.freeze(this)
  }

  getViewportWidth(windowWidth: number) {
    const borderWidth = 2
    const padding =
      this.config.leftWindowWidth + borderWidth + this.config.windowGap
    return windowWidth - padding
  }

  getViewportHeight(windowHeight: number) {
    const borderWidth = 2
    const padding = this.config.bottomWindowHeight + borderWidth
    return windowHeight - padding
  }

  getBlockValue(x: number, y: number) {
    return this.mapView.fullMap[y * this.mapView.mapWidth + x]
  }

  getBlock(x: number, y: number) {
    const engine = new InkEngine()
    return engine.getBlock(this.getBlockValue(x, y))
  }

  getViewportBlocks(windowWidth: number, windowHeight: number) {
    // ビューポートの中心座標を計算
    const halfViewportWidth = Math.floor(this.getViewportWidth(windowWidth) / 2)
    const halfViewportHeight = Math.floor(
      this.getViewportHeight(windowHeight) / 2,
    )

    // ビューポートの左上の座標を計算
    const startX = this.player.x - halfViewportWidth
    const startY = this.player.y - halfViewportHeight

    // ビューポート内の各ブロックを更新
    const viewport = Array.from(
      { length: this.getViewportHeight(windowHeight) },
      (_, y) => {
        return Array.from(
          { length: this.getViewportWidth(windowWidth) },
          (_, x) => {
            const mapX = startX + x
            const mapY = startY + y
            // プレイヤーの位置
            if (x === halfViewportWidth && y === halfViewportHeight) {
              return "@"
            }
            if (
              mapX >= 0 &&
              mapX < this.mapView.mapWidth &&
              mapY >= 0 &&
              mapY < this.mapView.mapHeight
            ) {
              return this.getBlockValue(mapX, mapY)
            }
            // マップの外
            return "0"
          },
        )
      },
    )

    return viewport
  }

  moveToTop() {
    const action = new PlayerContextAction(this.player)
    return action.moveToTop()
  }

  moveToLeft() {
    const action = new PlayerContextAction(this.player)
    return action.moveToLeft()
  }

  moveToBottom() {
    const action = new PlayerContextAction(this.player)
    return action.moveToBottom()
  }

  moveToRight() {
    const action = new PlayerContextAction(this.player)
    return action.moveToRight()
  }

  moveToTopLeft() {
    const action = new PlayerContextAction(this.player)
    return action.moveToTopLeft()
  }

  moveToTopRight() {
    const action = new PlayerContextAction(this.player)
    return action.moveToTopRight()
  }

  moveToBottomLeft() {
    const action = new PlayerContextAction(this.player)
    return action.moveToBottomLeft()
  }

  moveToBottomRight() {
    const action = new PlayerContextAction(this.player)
    return action.moveToBottomRight()
  }

  get hasEmptyTop() {
    const block = this.getBlock(this.player.x, this.player.y - 1)
    return !block.isWall
  }

  get hasEmptyLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y)
    return !block.isWall
  }

  get hasEmptyBottom() {
    const block = this.getBlock(this.player.x, this.player.y + 1)
    return !block.isWall
  }

  get hasEmptyRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y)
    return !block.isWall
  }

  get hasEmptyTopLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y - 1)
    return !block.isWall
  }

  get hasEmptyTopRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y - 1)
    return !block.isWall
  }

  get hasEmptyBottomLeft() {
    const block = this.getBlock(this.player.x - 1, this.player.y + 1)
    return !block.isWall
  }

  get hasEmptyBottomRight() {
    const block = this.getBlock(this.player.x + 1, this.player.y + 1)
    return !block.isWall
  }
}
