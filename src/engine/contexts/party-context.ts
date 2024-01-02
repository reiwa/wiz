import { z } from "zod"
import { CharacterContext } from "./character-context.js"

const zProps = z.object({
  id: z.string(),
  characters: z.array(z.instanceof(CharacterContext)),
})

type Props = z.infer<typeof zProps>

/**
 * Party
 */
export class PartyContext implements Props {
  readonly id!: Props["id"]

  readonly characters: CharacterContext[] = []

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get isDead() {
    return false
  }
}
