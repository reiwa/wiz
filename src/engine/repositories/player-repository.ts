import { existsSync } from "fs"
import { homedir } from "os"
import { join } from "path"
import { mkdir, readFile, writeFile } from "fs/promises"
import { ActorContextFactory } from "../contexts/actor-context-factory.js"
import { ActorContext } from "../contexts/actor-context.js"

export class PlayerRepository {
  get configPath() {
    return join(homedir(), ".config", "wiz")
  }

  async write(context: ActorContext) {
    await this.createDirectory()
    const filePath = join(this.configPath, "player.json")
    const factory = new ActorContextFactory(context)
    const text = factory.toJSON()
    await writeFile(filePath, text)
  }

  async read() {
    await this.createDirectory()
    const filePath = join(this.configPath, "player.json")
    const text = await readFile(filePath, "utf-8")
    return ActorContextFactory.fromJSON(text)
  }

  async createDirectory() {
    const configDirectory = join(homedir(), ".config")
    if (!existsSync(configDirectory)) {
      await mkdir(configDirectory)
    }
    const appDirectory = join(homedir(), ".config", "wiz")
    if (!existsSync(appDirectory)) {
      await mkdir(appDirectory)
    }
  }
}
