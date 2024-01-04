import { ActorContext } from "../contexts/actor-context.js"
import { Actor } from "../contexts/actor.js"
import { BattleContext } from "../contexts/battle-context.js"
import { ConfigContext } from "../contexts/config-context.js"
import { FieldContext } from "../contexts/field-context.js"
import { MapSheetContext } from "../contexts/map-sheet-context.js"
import { ViewportContext } from "../contexts/viewport-context.js"
import { InkEngine } from "./ink-engine.js"
import { PathEngine } from "./path-engine.js"

type Props = {
  config: ConfigContext
  view: FieldContext
  player: ActorContext
  mapSheet: MapSheetContext
  fieldView: FieldContext
  battle: BattleContext
  viewport: ViewportContext
}

export class ViewEngine {
  readonly config!: Props["config"]

  readonly view!: Props["view"]

  readonly player!: Props["player"]

  readonly mapSheet!: Props["mapSheet"]

  readonly fieldView!: Props["fieldView"]

  readonly battle!: Props["battle"]

  readonly viewport!: Props["viewport"]

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
    return this.mapSheet.cells[y * this.mapSheet.width + x]
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

    const enemies = this.fieldView.enemies

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
              mapX < this.mapSheet.width &&
              mapY >= 0 &&
              mapY < this.mapSheet.height
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

  moveEnemies(player: ActorContext) {
    const pathEngine = new PathEngine(this.mapSheet)

    const draftEnemies: ActorContext[] = []
    // [x, y]のペアを文字列として保存するためのSetを作成
    const reservations = new Set(
      this.fieldView.enemies.map((enemy) => `${enemy.x},${enemy.y}`),
    )

    for (const enemy of this.fieldView.enemies) {
      // 現在の敵の位置を予約済みの位置から一時的に削除
      reservations.delete(`${enemy.x},${enemy.y}`)

      // Setは文字列を要素として持つため、findNextに渡す前に適切な形式に変換する
      const reservedArray = Array.from(reservations).map((pos) => {
        return pos.split(",").map(Number) as [number, number]
      })

      const path = pathEngine.findNext(
        [enemy.x, enemy.y],
        [player.x, player.y],
        reservedArray,
      )

      const [x, y] = path
      const factory = new Actor(enemy)
      const draftEnemy = factory.moveTo(x, y)
      draftEnemies.push(draftEnemy)

      // 新しい位置を予約済み位置に追加
      reservations.add(`${x},${y}`)
    }

    return new FieldContext({
      ...this.fieldView,
      enemies: draftEnemies,
    })
  }

  moveToTop() {
    const factory = new Actor(this.player)
    return factory.moveToTop()
  }

  moveToLeft() {
    const factory = new Actor(this.player)
    return factory.moveToLeft()
  }

  moveToBottom() {
    const factory = new Actor(this.player)
    return factory.moveToBottom()
  }

  moveToRight() {
    const factory = new Actor(this.player)
    return factory.moveToRight()
  }

  moveToTopLeft() {
    const factory = new Actor(this.player)
    return factory.moveToTopLeft()
  }

  moveToTopRight() {
    const factory = new Actor(this.player)
    return factory.moveToTopRight()
  }

  moveToBottomLeft() {
    const factory = new Actor(this.player)
    return factory.moveToBottomLeft()
  }

  moveToBottomRight() {
    const factory = new Actor(this.player)
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
