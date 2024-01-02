export class BlockEngine {
  getBlock(text: string) {
    const spaceText = " "

    if (text === spaceText) {
      return {
        color: undefined,
        text: spaceText,
      }
    }

    if (text === "@") {
      return {
        color: "#0058f8",
        text: "@",
      }
    }

    if (text === "0") {
      return {
        color: undefined,
        text: spaceText,
      }
    }

    if (text === ".") {
      return {
        color: "grey",
        text: ".",
      }
    }

    /**
     * 壁
     */
    if (text === "1") {
      return {
        color: "#004058",
        text: spaceText,
      }
    }

    /**
     * 道路
     */
    if (text === "2") {
      return {
        color: "#bcbcbc",
        text: ".",
      }
    }

    /**
     * 建物
     */
    if (text === "3") {
      return {
        color: "#004058",
        text: spaceText,
      }
    }

    /**
     * 建物の中
     */
    if (text === "4") {
      return {
        color: "#008888",
        text: spaceText,
      }
    }

    /**
     * 扉
     */
    if (text === "+") {
      return {
        color: "#134e4a",
        text: "+",
      }
    }

    return {
      color: "gray",
      text: text,
    }
  }
}
