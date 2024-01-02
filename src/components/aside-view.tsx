import { Box, Newline, Text } from "ink"
import { ConfigContext } from "../engine/contexts/config-context.js"
import { PlayerContext } from "../engine/contexts/player-context.js"

type Props = {
  config: ConfigContext
  player: PlayerContext
}

export const AsideView = (props: Props) => {
  return (
    <Box
      paddingX={1}
      overflow={"hidden"}
      flexDirection="column"
      width={props.config.leftWindowWidth}
      borderStyle={"bold"}
    >
      <Text>{"Lv. 2"}</Text>
      <Newline />
      <Text>{`p ${props.player.x}, ${props.player.y}`}</Text>
    </Box>
  )
}
