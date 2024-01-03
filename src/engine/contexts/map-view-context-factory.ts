import { MapViewContext } from "./map-view-context.js"

export class MapViewContextFactory {
  static fromMapText(mapText: string) {
    const [firstLine] = mapText.split("\n")

    const width = firstLine.trim().split(" ").join("").length

    const height = mapText.split("\n").filter((t) => t).length

    const cells = mapText.split("\n").flatMap((row) => {
      return row.split(" ").join("").trim().split("")
    })

    return new MapViewContext({
      cells,
      width: width,
      height: height,
    })
  }
}
