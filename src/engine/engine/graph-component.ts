import { GraphLayer } from "./graph-layer.js"

type Props = {
  x: number
  y: number
  layer: GraphLayer
  children: GraphComponent[]
}

/**
 * 長方形の2Dのグリッド
 */
export class GraphComponent {
  readonly x!: Props["x"]

  readonly y!: Props["y"]

  readonly node!: Props["layer"]

  readonly children!: Props["children"]

  constructor(props: Props) {
    this.x = props.x
    this.y = props.y
    this.children = props.children
    let mergedLayer = props.layer
    for (const component of props.children) {
      mergedLayer = mergedLayer.merge(component.x, component.y, component.node)
    }
    this.node = mergedLayer
  }
}
