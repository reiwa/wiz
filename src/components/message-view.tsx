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
    </Box>
  )
}
