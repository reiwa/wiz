import { CharacterContext } from "./character-context.js"

/**
 * Character
 */
export class CharacterContextAction {
  constructor(private context: CharacterContext) {}

  moveToTop() {
    return new CharacterContext({
      ...this.context,
      y: this.context.y - 1,
    })
  }

  moveToLeft() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x - 1,
    })
  }

  moveToBottom() {
    return new CharacterContext({
      ...this.context,
      y: this.context.y + 1,
    })
  }

  moveToRight() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x + 1,
    })
  }

  moveToTopLeft() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y - 1,
    })
  }

  moveToTopRight() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y - 1,
    })
  }

  moveToBottomLeft() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y + 1,
    })
  }

  moveToBottomRight() {
    return new CharacterContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y + 1,
    })
  }
}
