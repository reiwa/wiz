import { z } from "zod"
import { MapBlockType } from "./map-block-type.js"

const zProps = z.object({
  type: z.instanceof(MapBlockType),
  isWalkable: z.boolean(),
})

type Props = z.infer<typeof zProps>

export class MapBlock {
  readonly type!: Props["type"]

  readonly isWalkable!: Props["isWalkable"]

  constructor(props: z.infer<typeof zProps>) {
    Object.assign(this, props)
    Object.freeze(this)
  }
}
