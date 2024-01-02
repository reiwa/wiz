import { Box } from "ink"
import { FieldBlock } from "./field-block.js"

type Props = {
  blocks: string[][]
}

export const GraphicView = (props: Props) => {
  return (
    <Box flexDirection="column" borderStyle={"bold"}>
      {props.blocks.map((rows, index) => (
        <Box key={index} flexDirection="row">
          {rows.map((value, index) => (
            <FieldBlock key={index} value={value} />
          ))}
        </Box>
      ))}
    </Box>
  )
}
