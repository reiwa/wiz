import { z } from "zod"

const zValue = z.union([
  z.literal("NULL"),
  z.literal("FLOOR"),
  z.literal("WALL"),
])

export class MapBlockType {
  constructor(readonly value: z.infer<typeof zValue>) {
    Object.assign(this, { value })
    Object.freeze(this)
  }

  static get floor() {
    return new MapBlockType("FLOOR")
  }

  static get wall() {
    return new MapBlockType("WALL")
  }

  static get null() {
    return new MapBlockType("NULL")
  }
}
