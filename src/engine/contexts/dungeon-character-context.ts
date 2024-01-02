import { z } from "zod"

export const zProps = z.object({
  x: z.number(),
  y: z.number(),
})

export type Props = z.infer<typeof zProps>

export class DungeonCharacterContext implements Props {
  readonly x!: Props["x"]

  readonly y!: Props["y"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
