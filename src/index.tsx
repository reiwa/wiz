import { readFile } from "fs/promises"
import { render } from "ink"
import { MainView } from "./components/main-view.js"

console.clear()

const mapText = await readFile("assets/map.txt", "utf-8")

/**
 * https://github.com/vadimdemedes/ink/issues/263#issuecomment-1634312819
 */
process.on("exit", () => {
  console.clear()
  // save
})

render(<MainView mapText={mapText} />)
