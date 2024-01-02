import { Text } from "ink"
import { BlockEngine } from "../engine/engine/block-engine.js"

type Props = {
  value: string
}

export function FieldBlock(props: Props) {
  const blockEngine = new BlockEngine()

  const block = blockEngine.getBlock(props.value)

  return <Text backgroundColor={block.color}>{block.text}</Text>
}
