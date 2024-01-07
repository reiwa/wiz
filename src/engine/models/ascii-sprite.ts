import { z } from "zod"
import { AsciiBlock } from "./ascii-block.js"

const zProps = z.object({
  width: z.number(),
  height: z.number(),
  blocks: z.array(z.array(z.instanceof(AsciiBlock).nullable())),
})

export type Props = z.infer<typeof zProps>

export class AsciiSprite {
  readonly width!: Props["width"]

  readonly height!: Props["height"]

  readonly blocks!: Props["blocks"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  /**
   * テキストから
   * @param text ハイフンで区切られた文字列
   */
  static fromText(text: string) {
    const chars = text
      .split("\n")
      .filter((t) => 0 < t.trim().length)
      .flatMap((t) => t.trim().split("-"))
      .join("-")
      .split("-")
    const height = Math.sqrt(chars.length / 2)
    const width = height * 2
    const blocks = Array.from({ length: height }).map((_, y) => {
      return Array.from({ length: width }).map((_, x) => {
        const char = chars[y * width + x]
        if (char === "") return null
        return new AsciiBlock({ char: " ", color: char })
      })
    })
    return new AsciiSprite({ width, height, blocks })
  }

  static empty(width: number, height: number) {
    const blocks = Array.from({ length: height }, () => {
      return Array.from({ length: width }, () => {
        return null
      })
    })
    return new AsciiSprite({ width, height, blocks })
  }

  /**
   * ハイフンで区切られた文字列に変換する
   * @param blocks
   */
  static toText(blocks: AsciiBlock[][]) {
    return blocks
      .map((row) => row.map((block) => block.color).join("-"))
      .join("-")
  }
}
