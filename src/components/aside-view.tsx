import { Box, Newline, Text } from "ink"
import { ActorContext } from "../engine/contexts/actor-context.js"
import { ConfigContext } from "../engine/contexts/config-context.js"

type Props = {
  value: string
  config: ConfigContext
  player: ActorContext
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
      <Text>{props.value}</Text>
      <Newline />
      <Text>{"Lv. 2"}</Text>
      <Newline />
      <Text>{`p ${props.player.x}, ${props.player.y}`}</Text>
      <Newline />
      <Text>{"HP 4/16"}</Text>
    </Box>
  )
}
