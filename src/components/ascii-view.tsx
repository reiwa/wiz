import { Box, Text } from "ink"
import { AsciiSprite } from "../engine/models/ascii-sprite.js"

type Props = {
  sprite: AsciiSprite
}

export const AsciiView = (props: Props) => {
  return (
    <Box flexDirection="column" borderStyle={"bold"}>
      {props.sprite.blocks.map((rows, index) => (
        <Box key={index} flexDirection="row">
          {rows.map((block, index) => (
            <Text key={index} backgroundColor={block?.colorCode}>
              {block?.char ?? "."}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}
