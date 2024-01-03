import { PlayerContext } from "./player-context.js"

export class PlayerContextFactory {
  constructor(private context: PlayerContext) {}

  moveToTop() {
    return new PlayerContext({
      ...this.context,
      y: this.context.y - 1,
    })
  }

  moveToLeft() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x - 1,
    })
  }

  moveToBottom() {
    return new PlayerContext({
      ...this.context,
      y: this.context.y + 1,
    })
  }

  moveToRight() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x + 1,
    })
  }

  moveToTopLeft() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y - 1,
    })
  }

  moveToTopRight() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y - 1,
    })
  }

  moveToBottomLeft() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y + 1,
    })
  }

  moveToBottomRight() {
    return new PlayerContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y + 1,
    })
  }

  static fromJSON(json: string) {
    const props = JSON.parse(json)
    return new PlayerContext(props)
  }
}
