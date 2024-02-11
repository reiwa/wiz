import { GraphComponent } from "./graph-component.js"
import { GraphLayer } from "./graph-layer.js"
import { GraphNode } from "./graph-node.js"

type Props = {
  width: number
  height: number
  children: GraphComponent[]
}

/**
 * 長方形の2Dのグリッド
 */
export class GraphComponentBase extends GraphComponent {
  constructor(props: Props) {
    const texts = Array.from({ length: props.width * props.height }, () => {
      return new GraphNode({
        char: null,
        color: 0,
        backgroundColor: null,
      })
    })
    const node = new GraphLayer({
      texts: texts,
      width: props.width,
      height: props.height,
    })
    super({
      x: 0,
      y: 0,
      layer: node,
      children: props.children,
    })
  }
}
