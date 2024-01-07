import { ActorContext } from "../contexts/actor-context.js"
import { ConfigContext } from "../contexts/config-context.js"
import { ViewportContext } from "../contexts/viewport-context.js"
import { AsciiSprite } from "../models/ascii-sprite.js"

type Props = {
  config: ConfigContext
  player: ActorContext
  viewport: ViewportContext
}

export class BattleViewEngine {
  readonly config!: Props["config"]

  readonly player!: Props["player"]

  readonly viewport!: Props["viewport"]

  get viewportWidth() {
    const borderWidth = 2
    const padding = borderWidth + this.config.windowGap
    return this.viewport.windowWidth - padding
  }

  get viewportHeight() {
    const borderWidth = 2
    const padding =
      this.config.battleCommandWindowHeight +
      this.config.battleStatusWindowHeight +
      borderWidth
    return this.viewport.windowHeight - padding
  }

  get battleView() {
    const baseSprite = AsciiSprite.empty(
      this.viewportWidth,
      this.viewportHeight,
    )

    const crabText = `
    -------------------------------
    -------------------------------
    196--196----------236------236----------196--196-
    196--196--196--196------196------196------196--196--196--196-
    196--196--196--196--202--202--202--202--202--202--202--202--196--196--196--196-
    --------202--202--202--202--202--202--202--202---------
    ----196--196--202--202--202--202--202--202--202--202--196--196-----
    ----196----------------------196-----`

    const catText = `
    -------------------------------
    ----236--236----236--236-------------------
    --236--236--236--236--236--236--236-----------------
    236--236--201--236--236--201--236--236--236--------236--236-----
    --236--236--236--236--236--236--236------------236-----
    ------236--236--236--236--236--236----------236--236---
    ------236--236--236--236--236--236--------236--236-----
    --236--236--236--236--236--236--236--236--236--236--236--236-------`

    const overlayArray = [
      AsciiSprite.fromText(crabText),
      AsciiSprite.fromText(catText),
    ]

    return this.distributeOverlays(baseSprite, overlayArray)
  }

  constructor(props: Props) {
    Object.assign(this, props)
    Object.freeze(this)
  }

  distributeOverlays(base: AsciiSprite, overlays: AsciiSprite[]): AsciiSprite {
    const gap = 8
    const centerX = Math.floor(this.viewportWidth / 2)
    const centerY = Math.floor(this.viewportHeight / 2)

    // overlays の幅の合計と間隔を計算
    let totalLength = 0
    for (const overlaySprite of overlays) {
      totalLength += overlaySprite.width
      if (overlays.indexOf(overlaySprite) < overlays.length - 1) {
        // 最後の要素以外に間隔を加算
        totalLength += gap
      }
    }

    // 配置の開始位置の計算
    let currentX = centerX - Math.floor(totalLength / 2)

    let currentSprite = base

    for (const overlaySprite of overlays) {
      currentSprite = this.overwriteArray(
        currentSprite,
        overlaySprite,
        currentX + Math.floor(overlaySprite.width / 2),
        centerY,
      )
      // 次のスプライトのために位置を更新
      currentX += overlaySprite.width + gap
    }

    return currentSprite
  }

  overwriteArray(
    base: AsciiSprite,
    sprites: AsciiSprite,
    centerX: number,
    centerY: number,
  ): AsciiSprite {
    const startX = centerX - Math.floor(sprites.width / 2)
    const startY = centerY - Math.floor(sprites.height / 2)

    const endX = startX + sprites.width
    const endY = startY + sprites.height

    const blocks = base.blocks.map((row, y) => {
      return row.map((block, x) => {
        // 重なる部分だけを確認
        if (x >= startX && x < endX && y >= startY && y < endY) {
          const overlayBlock = sprites.blocks[y - startY][x - startX]
          // nullでなければ上書き
          return overlayBlock ? overlayBlock : block
        }
        return block
      })
    })

    return new AsciiSprite({
      width: base.width,
      height: base.height,
      blocks: blocks,
    })
  }
}
