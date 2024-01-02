import { z } from "zod"

export const zProps = z.object({
  windowGap: z.number(),
  leftWindowWidth: z.number(),
  bottomWindowHeight: z.number(),
})

export type Props = z.infer<typeof zProps>

export class ConfigContext implements Props {
  readonly windowGap!: Props["windowGap"]

  readonly leftWindowWidth!: Props["leftWindowWidth"]

  readonly bottomWindowHeight!: Props["bottomWindowHeight"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }
}
