import { z } from "zod"

const zProps = z.object({
  cells: z.array(z.string()),
  width: z.number(),
  height: z.number(),
})

export type Props = z.infer<typeof zProps>

export class MapViewContext implements Props {
  readonly width!: number

  readonly height!: number

  readonly cells!: string[]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
