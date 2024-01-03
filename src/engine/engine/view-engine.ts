import { ActorContextFactory } from "../contexts/actor-context-factory.js"
import { ConfigContext } from "../contexts/config-context.js"
import { FieldViewContext } from "../contexts/field-view-context.js"
import { MapViewContext } from "../contexts/map-view-context.js"
import { PlayerContextFactory } from "../contexts/player-context-factory.js"
import { PlayerContext } from "../contexts/player-context.js"
import { InkEngine } from "./ink-engine.js"

type Props = {
  config: ConfigContext
  view: FieldViewContext
  player: PlayerContext
  mapView: MapViewContext
  townView: FieldViewContext
}

export class ViewEngine {
  readonly config!: Props["config"]

  readonly view!: Props["view"]

  readonly player!: Props["player"]

  readonly mapView!: Props["mapView"]

  readonly townView!: Props["townView"]

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
    return this.mapView.cells[y * this.mapView.width + x]
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

    const enemies = this.townView.enemies

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
            for (const enemy of enemies) {
              if (enemy.x === mapX && enemy.y === mapY) {
                return "e"
              }
            }
            if (
              mapX >= 0 &&
              mapX < this.mapView.width &&
              mapY >= 0 &&
              mapY < this.mapView.height
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

  moveEnemy(enemyId: string) {
    const enemies = this.townView.enemies.map((enemy) => {
      if (enemy.id === enemyId) {
        // 敵とプレイヤーの位置差を計算
        const dx = this.player.x - enemy.x
        const dy = this.player.y - enemy.y
        // 敵をプレイヤーの方向に1ステップ動かす
        const moveX = dx !== 0 ? dx / Math.abs(dx) : 0 // -1, 0, or 1
        const moveY = dy !== 0 ? dy / Math.abs(dy) : 0 // -1, 0, or 1
        // 新しい敵の位置を計算（壁や障害物を考慮）
        const newEnemyX = enemy.x + moveX
        const newEnemyY = enemy.y + moveY
        // 移動先が壁や障害物でないかチェック
        if (!this.isMoveable(newEnemyX, newEnemyY)) {
          return enemy
        }
        // 敵の新しい位置を更新
        const factory = new ActorContextFactory(enemy)
        return factory.moveTo(newEnemyX, newEnemyY)
      }
      return enemy
    })

    return new FieldViewContext({
      ...this.townView,
      enemies,
    })
  }

  moveToTop() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToTop()
  }

  moveToLeft() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToLeft()
  }

  moveToBottom() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToBottom()
  }

  moveToRight() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToRight()
  }

  moveToTopLeft() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToTopLeft()
  }

  moveToTopRight() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToTopRight()
  }

  moveToBottomLeft() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToBottomLeft()
  }

  moveToBottomRight() {
    const factory = new PlayerContextFactory(this.player)
    return factory.moveToBottomRight()
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

  /**
   * 進行可能かどうかを判定する
   * @param x
   * @param y
   * @returns
   */
  isMoveable(x: number, y: number): boolean {
    const block = this.getBlock(x, y)
    return !block.isWall
  }
}
