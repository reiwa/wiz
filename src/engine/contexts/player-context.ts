import { z } from "zod"

export const zProps = z.object({
  lifePoint: z.number(),
  experiencePoint: z.number(),
  x: z.number(),
  y: z.number(),
})

export type Props = z.infer<typeof zProps>

export class PlayerContext implements Props {
  readonly lifePoint!: Props["lifePoint"]

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

  static fromJSON(json: string) {
    const props = JSON.parse(json)
    return new PlayerContext(props)
  }
}
