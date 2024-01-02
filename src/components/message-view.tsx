import { Box, Text } from "ink"
import { ConfigContext } from "../engine/contexts/config-context.js"

type Props = {
  config: ConfigContext
}

export const MessageView = (props: Props) => {
  return (
    <Box
      paddingX={1}
      overflow={"hidden"}
      flexDirection="column"
      height={props.config.bottomWindowHeight}
      borderStyle={"bold"}
    >
      <Text>{"i = 所持品"}</Text>
      <Text>{"w = 上に移動, a = 左, s = 下, d = 右"}</Text>
    </Box>
  )
}
