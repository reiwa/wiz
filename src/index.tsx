import { readFile } from "fs/promises"
import { render } from "ink"
import { RootView } from "./components/root-view.js"

console.clear()

const mapText = await readFile("assets/map.txt", "utf-8")

/**
 * https://github.com/vadimdemedes/ink/issues/263#issuecomment-1634312819
 */
process.on("exit", (code) => {
  if (code === 0) {
    console.clear()
  }
  // save
})

render(<RootView mapText={mapText} />)
