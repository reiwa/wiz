import { GraphComponent } from "./graph-component.js"
import { GraphLayer } from "./graph-layer.js"
import { GraphNode } from "./graph-node.js"

type Props = {
  x: number
  y: number
  width: number
  height: number
  children: GraphComponent[]
}

/**
 * 長方形の2Dのグリッド
 */
export class GraphComponentWindow extends GraphComponent {
  constructor(props: Props) {
    // 枠線の色
    const edgeColor = 4

    const texts = Array.from(
      { length: props.width * props.height },
      (_, index) => {
        // 上端
        const isTopEdge = index < props.width
        // 下端
        const isBottomEdge = index >= (props.height - 1) * props.width
        // 左端
        const isLeftEdge = index % props.width === 0
        // 右端
        const isRightEdge = index % props.width === props.width - 1
        // 文字
        let char
        if (isTopEdge && isLeftEdge) {
          // 左上の角
          char = "┏"
        } else if (isTopEdge && isRightEdge) {
          // 右上の角
          char = "┓"
        } else if (isBottomEdge && isLeftEdge) {
          // 左下の角
          char = "┗"
        } else if (isBottomEdge && isRightEdge) {
          // 右下の角
          char = "┛"
        } else if (isTopEdge || isBottomEdge) {
          // 横線
          char = "━"
        } else if (isLeftEdge || isRightEdge) {
          // 縦線
          char = "┃"
        } else {
          char = null
        }
        const color =
          isTopEdge || isBottomEdge || isLeftEdge || isRightEdge ? edgeColor : 2
        return new GraphNode({
          char: char,
          color: color,
          backgroundColor: 1,
        })
      },
    )

    const node = new GraphLayer({
      texts: texts,
      width: props.width,
      height: props.height,
    })

    super({
      x: props.x,
      y: props.y,
      layer: node,
      children: props.children,
    })
  }
}
