import { MapSheetContext } from "../contexts/map-sheet-context.js"
import { MapSheet } from "../contexts/map-sheet.js"
import { PathNode } from "../models/path-node.js"

export class PathEngine {
  /**
   * 移動可能な座標のセット
   */
  get availableBlocks(): Set<string> {
    const mapSheet = new MapSheet(this.mapSheetContext)
    return new Set(
      mapSheet.availableBlocks.map((pos) => {
        return `${pos[0]},${pos[1]}`
      }),
    )
  }

  /**
   * 移動できないパスのセット
   */
  get unavailableBlocks(): Set<string> {
    const mapSheet = new MapSheet(this.mapSheetContext)
    return new Set(
      mapSheet.unavailableBlocks.map((pos) => {
        return `${pos[0]},${pos[1]}`
      }),
    )
  }

  constructor(readonly mapSheetContext: MapSheetContext) {}

  findNext(
    start: [number, number],
    goal: [number, number],
    reservedPositions: [number, number][],
  ): [number, number] {
    const [startX, startY] = start

    const [goalX, goalY] = goal

    // 移動可能かつ移動できないパスでない座標を考慮して経路を計算
    const path = this.findPath(
      [startX, startY],
      [goalX, goalY],
      reservedPositions,
    )

    // 次の座標が見つからない、または移動不可能な場合
    if (!path || path.length <= 1) {
      return start
    }

    const [, nextBlock] = path

    const [nextX, nextY] = nextBlock

    // ゴールと次の移動位置が一致する場合はnullを返す
    if (nextX === goalX && nextY === goalY) {
      return start
    }

    // findPathからの経路はすでに移動可能な座標のみを含むため、
    // 次の座標を直接返す
    return nextBlock
  }

  findPath(
    start: [number, number],
    goal: [number, number],
    reservedPositions: [number, number][],
  ): [number, number][] | null {
    const [startX, startY] = start

    const [goalX, goalY] = goal

    // オープンリストとクローズドリストを初期化
    let openList: PathNode[] = []
    const closedList: PathNode[] = []
    const startNode = new PathNode(
      startX,
      startY,
      null,
      0,
      this.calculateH(startX, startY, goalX, goalY),
    )
    openList.push(startNode)

    while (openList.length > 0) {
      // fが最小のノードを選択
      const current = openList.reduce((prev, curr) => {
        return prev.f < curr.f ? prev : curr
      })

      // ゴールに到達したか確認
      if (current.x === goalX && current.y === goalY) {
        return this.constructPath(current)
      }

      // 現在のノードをオープンリストから削除し、クローズドリストに追加
      openList = openList.filter((node) => node !== current)
      closedList.push(current)

      // 隣接ノードを取得
      const neighbors = this.getNeighbors(current, reservedPositions)
      for (const neighbor of neighbors) {
        if (
          closedList.some((node) => {
            return node.x === neighbor.x && node.y === neighbor.y
          })
        ) {
          continue // すでに処理済みのノードはスキップ
        }

        // g, h, fの値を更新
        neighbor.g = current.g + 1
        neighbor.h = this.calculateH(neighbor.x, neighbor.y, goalX, goalY)
        neighbor.f = neighbor.g + neighbor.h

        // 既にオープンリストに同じノードがあるか確認
        const openNode = openList.find((node) => {
          return node.x === neighbor.x && node.y === neighbor.y
        })
        if (!openNode || openNode.f > neighbor.f) {
          // より良い経路を見つけた場合、オープンリストに追加
          openList.push(neighbor)
        }
      }
    }

    // ゴールに到達できない場合
    return null
  }

  // ヒューリスティック関数（マンハッタン距離）
  private calculateH(
    x: number,
    y: number,
    goalX: number,
    goalY: number,
  ): number {
    return Math.abs(x - goalX) + Math.abs(y - goalY)
  }

  /**
   * 経路を再構築する
   * @param node
   * @returns
   */
  private constructPath(node: PathNode): [number, number][] {
    const path: [number, number][] = []
    /**
     * 現在のノードを追跡する新しい変数
     */
    let currentNode: PathNode | null = node
    while (currentNode) {
      path.unshift([currentNode.x, currentNode.y])
      // currentNodeを更新
      currentNode = currentNode.parent
    }
    return path
  }

  /**
   * 隣接ノードを取得する（予約済みの座標を考慮）
   * @param node
   * @param reservedPositions 予約済みの座標
   * @returns
   */
  private getNeighbors(
    node: PathNode,
    reservedPositions: [number, number][],
  ): PathNode[] {
    const directions = [
      [0, -1], // 上
      [0, 1], // 下
      [-1, 0], // 左
      [1, 0], // 右
    ]

    const neighbors: PathNode[] = []
    for (const [dx, dy] of directions) {
      const newX = node.x + dx
      const newY = node.y + dy

      // 新しい座標が予約済みでないか、壁でないか確認
      const isReserved = reservedPositions.some(
        ([x, y]) => x === newX && y === newY,
      )

      // 新しい座標がマップの範囲内かつ移動可能な場合
      if (!isReserved && this.isWithinMapAndMovable(newX, newY)) {
        // 新しいノードを作成し、リストに追加
        neighbors.push(new PathNode(newX, newY, node, 0, 0)) // gとhの値は適宜計算する
      }
    }

    return neighbors
  }

  private isWithinMapAndMovable(x: number, y: number): boolean {
    const key = `${x},${y}`
    // 移動可能な座標セットを使用してチェックし、同時に移動できないパスでないことを確認
    return this.availableBlocks.has(key) && !this.unavailableBlocks.has(key)
  }
}
