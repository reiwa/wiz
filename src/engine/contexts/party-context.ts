import { z } from "zod"
import { ActorContext } from "./actor-context.js"

const zProps = z.object({
  id: z.string(),
  actors: z.array(z.instanceof(ActorContext)),
})

type Props = z.infer<typeof zProps>

/**
 * Party
 */
export class PartyContext implements Props {
  readonly id!: Props["id"]

  readonly actors: ActorContext[] = []

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get isDead() {
    return false
  }
}
