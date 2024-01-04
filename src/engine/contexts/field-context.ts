import { z } from "zod"
import { ActorContext } from "./actor-context.js"

const zProps = z.object({
  enemies: z.array(z.instanceof(ActorContext)),
})

export type Props = z.infer<typeof zProps>

export class FieldContext implements Props {
  readonly enemies: Props["enemies"] = []

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
