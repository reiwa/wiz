import { MapSheetContext } from "./map-sheet-context.js"

// type Props = {
//   isWalkable(): boolean
// }

export class MapSheet {
  constructor(private context: MapSheetContext) {}

  static fromMapText(mapText: string) {
    const [firstLine] = mapText.split("\n")

    const width = firstLine.trim().split(" ").join("").length

    const height = mapText.split("\n").filter((t) => t).length

    const cells = mapText.split("\n").flatMap((row) => {
      return row.split(" ").join("").trim().split("")
    })

    return new MapSheetContext({
      cells,
      width: width,
      height: height,
    })
  }

  getValue(x: number, y: number) {
    return this.context.cells[y * this.context.width + x]
  }

  isWalkable(x: number, y: number) {
    const value = this.getValue(x, y)

    if (value === "0" || value === "-") {
      return false
    }

    if (value === "1") {
      return false
    }

    if (value === "3") {
      return false
    }

    return true
  }

  get availableBlocks() {
    const blocks = []
    for (let y = 0; y < this.context.height; y++) {
      for (let x = 0; x < this.context.width; x++) {
        if (this.isWalkable(x, y)) {
          blocks.push([x, y] as const)
        }
      }
    }
    return blocks
  }

  get unavailableBlocks() {
    const blocks = []
    for (let y = 0; y < this.context.height; y++) {
      for (let x = 0; x < this.context.width; x++) {
        if (!this.isWalkable(x, y)) {
          blocks.push([x, y] as const)
        }
      }
    }
    return blocks
  }
}
