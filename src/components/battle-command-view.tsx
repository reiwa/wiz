import { Box, Text } from "ink"
import { ConfigContext } from "../engine/contexts/config-context.js"

type Props = {
  config: ConfigContext
}

export const BattleCommandView = (props: Props) => {
  return (
    <Box
      paddingX={1}
      overflow={"hidden"}
      flexDirection="column"
      height={props.config.battleCommandWindowHeight}
      borderStyle={"bold"}
    >
      <Text>{"いきるためにはたたかうしかないぢゃん。"}</Text>
      <Text>{"> たたかう        アイテム"}</Text>
      <Text>{"                  にげる"}</Text>
    </Box>
  )
}
