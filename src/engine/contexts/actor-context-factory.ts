import { nanoid } from "nanoid"
import { z } from "zod"
import { characterAssetSchema } from "../schemas/character-asset-schema.js"
import { ActorContext } from "./actor-context.js"

/**
 * Actor
 */
export class ActorContextFactory {
  constructor(private context: ActorContext) {}

  moveToTop() {
    return new ActorContext({
      ...this.context,
      y: this.context.y - 1,
    })
  }

  moveToLeft() {
    return new ActorContext({
      ...this.context,
      x: this.context.x - 1,
    })
  }

  moveToBottom() {
    return new ActorContext({
      ...this.context,
      y: this.context.y + 1,
    })
  }

  moveToRight() {
    return new ActorContext({
      ...this.context,
      x: this.context.x + 1,
    })
  }

  moveToTopLeft() {
    return new ActorContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y - 1,
    })
  }

  moveToTopRight() {
    return new ActorContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y - 1,
    })
  }

  moveToBottomLeft() {
    return new ActorContext({
      ...this.context,
      x: this.context.x - 1,
      y: this.context.y + 1,
    })
  }

  moveToBottomRight() {
    return new ActorContext({
      ...this.context,
      x: this.context.x + 1,
      y: this.context.y + 1,
    })
  }

  static fromAsset(
    asset: z.infer<typeof characterAssetSchema>,
    props: {
      x: number
      y: number
    },
  ) {
    return new ActorContext({
      id: nanoid(),
      symbol: "",
      name: asset.name,
      x: props.x,
      y: props.y,
      lifePoint: asset.life_point,
      maxLifePoint: asset.life_point,
      experiencePoint: asset.experience_point,
      cooldownTime: asset.cooldown_time,
      maxCooldownTime: asset.cooldown_time,
      attack: asset.attack,
      maxAttack: asset.attack,
      defense: asset.defense,
      maxDefense: asset.defense,
      magicAttack: asset.magic_attack,
      maxMagicAttack: asset.magic_attack,
      magicDefense: asset.magic_defense,
      maxMagicDefense: asset.magic_defense,
      dexterity: asset.dexterity,
      evasion: asset.evasion,
      humanity: asset.humanity,
    })
  }
}
