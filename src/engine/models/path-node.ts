export class PathNode {
  x: number
  y: number
  parent: PathNode | null

  /**
   * スタートからのコスト
   */
  g: number

  /**
   * ゴールまでの推定コスト
   */
  h: number

  /**
   * g + h
   */
  f: number

  constructor(
    x: number,
    y: number,
    parent: PathNode | null,
    g: number,
    h: number,
  ) {
    this.x = x
    this.y = y
    this.parent = parent
    this.g = g
    this.h = h
    this.f = g + h
  }
}
