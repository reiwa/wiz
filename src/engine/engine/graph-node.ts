type Props = {
  backgroundColor: number | null
  color: number | null
  char: string | null
}

export class GraphNode implements Props {
  /**
   * 文字列
   */
  readonly char!: Props["char"]

  /**
   * 色
   */
  readonly color!: Props["color"]

  readonly backgroundColor!: Props["backgroundColor"]

  constructor(props: Props) {
    Object.assign(this, props)
  }
}
