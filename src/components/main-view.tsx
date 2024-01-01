import { Box, Text, useApp, useInput } from "ink"
import { useEffect, useState } from "react"
import { useWindowSize } from "../hooks/use-window-size.js"

export const MainView = () => {
  const app = useApp()

  const [counter, setCounter] = useState(0)

  const [text, setText] = useState("")

  const [columns, rows] = useWindowSize()

  useInput((input, key) => {
    if (input === "q" || key.escape) {
      app.exit()
    }

    if (key.leftArrow) {
      setText((value) => `${value}左`)
    }

    if (key.rightArrow) {
      setText((value) => `${value}右`)
    }

    if (key.upArrow) {
      setText((value) => `${value}上`)
    }

    if (key.downArrow) {
      setText((value) => `${value}下`)
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((value) => value + 1)
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  })

  return (
    <Box flexDirection="column">
      <Text backgroundColor={"green"}>count: {counter}</Text>
      <Text>
        {rows} x {columns}
      </Text>
      <Text>{text}</Text>
    </Box>
  )
}
