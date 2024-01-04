import { z } from "zod"
import { BattleCommandContext } from "./battle-command-context.js"

const zProps = z.object({
  commands: z.array(z.instanceof(BattleCommandContext)),
})

export type Props = z.infer<typeof zProps>

export class BattleContext implements Props {
  readonly commands!: Props["commands"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
