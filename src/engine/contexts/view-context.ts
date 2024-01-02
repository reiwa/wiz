import { z } from "zod"

export const zProps = z.object({
  mapText: z.string(),
  playerX: z.number(),
  playerY: z.number(),
  viewportX: z.number(),
  viewportY: z.number(),
})

export type Props = z.infer<typeof zProps>

export class ViewContext implements Props {
  readonly mapText!: string

  /**
   * ビューの中心の座標
   */
  readonly viewportX!: Props["viewportX"]

  readonly viewportY!: Props["viewportY"]

  /**
   * プレイヤーの座標
   */
  readonly playerX!: Props["playerX"]

  readonly playerY!: Props["playerY"]

  /**
   * プレイヤーの移動可能な範囲
   */
  readonly moveRangeX = 8

  readonly moveRangeY = 4

  constructor(private props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  toJSON() {
    return JSON.stringify(this.props)
  }

  static fromJSON(json: string) {
    const props = JSON.parse(json)
    return new ViewContext(props)
  }
}
