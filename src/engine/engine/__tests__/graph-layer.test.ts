import { GraphLayer } from "../graph-layer.js"
import { GraphNode } from "../graph-node.js"

describe("graph-layer", () => {
  const nodeA = new GraphNode({ color: 0, char: "a" })

  const layerA = new GraphLayer({
    texts: [
      [nodeA, nodeA, nodeA, nodeA],
      [nodeA, nodeA, nodeA, nodeA],
      [nodeA, nodeA, nodeA, nodeA],
      [nodeA, nodeA, nodeA, nodeA],
    ].flat(),
    width: 4,
    height: 4,
  })

  const nodeB = new GraphNode({ color: 0, char: "b" })

  const layerB = new GraphLayer({
    texts: [
      [nodeB, nodeB],
      [nodeB, nodeB],
    ].flat(),
    width: 2,
    height: 2,
  })

  test("merge 0", () => {
    const layer = layerA.merge(1, 1, layerB)
    const result =
      "a-0,a-0,a-0,a-0,a-0,b-0,b-0,a-0,a-0,b-0,b-0,a-0,a-0,a-0,a-0,a-0"
    expect(layer.nodeText).toBe(result)
  })

  test("merge 1", () => {
    const layer = layerA.merge(0, 0, layerB)
    const result =
      "b-0,b-0,a-0,a-0,b-0,b-0,a-0,a-0,a-0,a-0,a-0,a-0,a-0,a-0,a-0,a-0"
    expect(layer.nodeText).toBe(result)
  })
})
