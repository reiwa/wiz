import { GraphNode } from "./graph-node.js"

type Props = {
  texts: GraphNode[]
  width: number
  height: number
}

/**
 * 長方形の2Dのグリッド
 */
export class GraphLayer {
  readonly texts!: GraphNode[]

  /**
   * 幅
   */
  readonly width!: Props["width"]

  /**
   * 高さ
   */
  readonly height!: Props["height"]

  constructor(private props: Props) {
    Object.assign(this, props)
  }

  /**
   * レイヤーを重ねて結合する
   * @param layer
   */
  merge(x: number, y: number, layer: GraphLayer) {
    const gridWidth = this.width
    const texts = this.texts.map((node, index) => {
      const layerX = index % gridWidth
      const layerY = Math.floor(index / gridWidth)
      const isWithinXBounds = x <= layerX && layerX < x + layer.width
      const isWithinYBounds = y <= layerY && layerY < y + layer.height
      if (!isWithinXBounds || !isWithinYBounds) return node
      const layerIndex = (layerY - y) * layer.width + (layerX - x)
      const layerNode = layer.texts[layerIndex]
      return {
        ...node,
        char: layerNode.char,
        color: layerNode.color,
        backgroundColor: layerNode.backgroundColor,
      }
    })
    return new GraphLayer({
      ...this.props,
      texts: texts,
    })
  }

  get nodeText() {
    return this.texts.map((node) => `${node.char}-${node.color}`).join(",")
  }

  /**
   * 2D配列
   */
  get texts2d(): GraphNode[][] {
    return Array.from({ length: this.height }, (_, y) => {
      return Array.from({ length: this.width }, (_, x) => {
        return this.texts[y * this.width + x]
      })
    })
  }
}
