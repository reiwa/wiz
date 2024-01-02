export class BlockEngine {
  getBlock(text: string) {
    const spaceText = " "

    if (text === "@") {
      return {
        color: "#0058f8",
        text: "@",
        type: "PLAYER",
        isWall: true,
      }
    }

    if (text === "0" || text === "-") {
      return {
        color: undefined,
        text: spaceText,
        type: "NULL",
        isWall: true,
      }
    }

    if (text === ".") {
      return {
        color: "grey",
        text: ".",
        type: "FLOOR",
        isFloor: false,
      }
    }

    /**
     * 壁
     */
    if (text === "1") {
      return {
        color: "#004058",
        text: spaceText,
        type: "WALL",
        isWall: true,
      }
    }

    /**
     * 道路
     */
    if (text === "2") {
      return {
        color: "#bcbcbc",
        text: ".",
        type: "ROAD",
        isFloor: false,
      }
    }

    /**
     * 建物
     */
    if (text === "3") {
      return {
        color: "#004058",
        text: spaceText,
        type: "BUILDING",
        isWall: true,
      }
    }

    /**
     * 建物の中
     */
    if (text === "4") {
      return {
        color: "#008888",
        text: spaceText,
        type: "FLOOR_INSIDE_BUILDING",
        isFloor: false,
      }
    }

    /**
     * 扉
     */
    if (text === "+") {
      return {
        color: "#134e4a",
        text: "+",
        type: "DOOR",
        isFloor: false,
      }
    }

    return {
      color: "gray",
      text: text,
      type: "UNKNOWN",
      isFloor: false,
    }
  }
}
