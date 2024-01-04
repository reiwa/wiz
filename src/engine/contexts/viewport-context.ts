import { z } from "zod"

const zProps = z.object({
  viewportX: z.number(),
  viewportY: z.number(),
})

export type Props = z.infer<typeof zProps>

export class ViewportContext implements Props {
  /**
   * ビューの中心の座標
   */
  readonly viewportX!: Props["viewportX"]

  readonly viewportY!: Props["viewportY"]

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
}
