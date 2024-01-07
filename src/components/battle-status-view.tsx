import { Box, Text } from "ink"
import { ConfigContext } from "../engine/contexts/config-context.js"

type Props = {
  config: ConfigContext
}

export const BattleStatusView = (props: Props) => {
  return (
    <Box
      paddingX={1}
      overflow={"hidden"}
      flexDirection="column"
      height={props.config.battleStatusWindowHeight}
      borderStyle={"bold"}
    >
      <Text>{"              HP       MP      Lv"}</Text>
      <Text>{"あなた     16/32     4/64       2      こうげき > カニ"}</Text>
      <Text>{"プンプン   20/40    12/32       4      にげる"}</Text>
      <Text>{"なかまA     4/32     8/40       3      "}</Text>
      <Text>{"なかまB     4/32     8/40       3      "}</Text>
    </Box>
  )
}
