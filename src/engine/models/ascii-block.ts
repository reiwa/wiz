import { z } from "zod"
import { nesColors } from "../utils/nes-colors.js"

const zProps = z.object({
  color: z.string(),
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
    return nesColors.get(this.color)
  }
}
