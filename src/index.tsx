import { render } from "ink"
import { MainView } from "./components/main-view.js"

process.stdout.write("\x1b[0f")

process.stdout.write("\x1b[?1049h")

/**
 * https://github.com/vadimdemedes/ink/issues/263#issuecomment-1634312819
 */
process.on("exit", () => {
  process.stdout.write("\x1b[?1049l")
  process.stdout.write("\x1b[0f")
})

render(<MainView />)
