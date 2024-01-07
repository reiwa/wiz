import { z } from "zod"
import { xtermColors } from "../utils/xterm-colors.js"

const zProps = z.object({
  color: z.number(),
  char: z.string().nullable(),
})

export type Props = z.infer<typeof zProps>

export class AsciiBlock {
  readonly color!: Props["color"]

  readonly char!: Props["char"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get colorCode() {
    return xtermColors[this.color] ?? "#000000"
  }
}
