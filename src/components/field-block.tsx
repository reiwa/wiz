import { Text } from "ink"
import { InkEngine } from "../engine/engine/ink-engine.js"

type Props = {
  value: string
}

export function FieldBlock(props: Props) {
  const blockEngine = new InkEngine()

  const block = blockEngine.getBlock(props.value)

  return <Text backgroundColor={block.color}>{block.text}</Text>
}
