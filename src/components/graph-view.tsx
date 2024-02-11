import { Box, Text } from "ink"
import { GraphNode } from "../engine/engine/graph-node.js"
import { xtermColors } from "../engine/utils/xterm-colors.js"

type Props = {
  texts: GraphNode[][]
}

export const GraphView = (props: Props) => {
  return (
    <Box flexDirection="column">
      {props.texts.map((rows, index) => (
        <Box key={index} flexDirection="row">
          {rows.map((node, index) => (
            <Text
              key={index}
              color={node.color ? xtermColors[node.color] : undefined}
              backgroundColor={
                node.backgroundColor
                  ? xtermColors[node.backgroundColor]
                  : undefined
              }
            >
              {node.char ?? "."}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}
