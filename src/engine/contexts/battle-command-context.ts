import { z } from "zod"

const zProps = z.object({
  type: z.string(),
})

export type Props = z.infer<typeof zProps>

export class BattleCommandContext implements Props {
  readonly type!: string

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
