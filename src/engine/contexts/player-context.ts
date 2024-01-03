import { z } from "zod"

export const zProps = z.object({
  lifePoint: z.number(),
  experiencePoint: z.number(),
  x: z.number(),
  y: z.number(),
})

export type Props = z.infer<typeof zProps>

export class PlayerContext implements Props {
  /**
   * ライフ
   */
  readonly lifePoint!: Props["lifePoint"]

  /**
   * 経験値
   */
  readonly experiencePoint!: Props["experiencePoint"]

  /**
   * 現在の座標
   */
  readonly x!: Props["x"]

  readonly y!: Props["y"]

  constructor(private props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  toJSON() {
    return JSON.stringify(this.props)
  }
}
