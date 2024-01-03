import { z } from "zod"

export const zProps = z.object({
  floor: z.number(),
  x: z.number(),
  y: z.number(),
})

export type Props = z.infer<typeof zProps>

export class DungeonViewContext implements Props {
  readonly floor!: Props["floor"]

  /**
   * 現在の座標
   */
  readonly x: Props["x"] = 0

  readonly y: Props["y"] = 0

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
    return new DungeonViewContext(props)
  }
}
