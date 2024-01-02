import { z } from "zod"

const zProps = z.object({
  mapText: z.string(),
})

export type Props = z.infer<typeof zProps>

const mapCache = new Map<string, unknown>([])

export class MapViewContext implements Props {
  readonly mapText!: string

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get mapWidth() {
    const [firstLine] = this.mapText.split("\n")
    return firstLine.trim().split(" ").join("").length
  }

  get mapHeight() {
    return this.mapText.split("\n").filter((t) => t).length
  }

  get fullMap(): string[] {
    if (mapCache.has("current")) {
      return mapCache.get("current") as string[]
    }
    mapCache.set("current", MapViewContext.loadFullMap(this.mapText))
    return mapCache.get("current") as string[]
  }

  static loadFullMap(mapText: string) {
    return mapText.split("\n").flatMap((row) => {
      return row.split(" ").join("").trim().split("")
    })
  }
}
