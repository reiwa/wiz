import { nanoid } from "nanoid"
import { z } from "zod"
import { characterAssetSchema } from "../schemas/character-asset-schema.js"

const zProps = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  x: z.number(),
  y: z.number(),
  lifePoint: z.number(),
  maxLifePoint: z.number(),
  experiencePoint: z.number(),
  cooldownTime: z.number(),
  maxCooldownTime: z.number(),
  attack: z.number(),
  maxAttack: z.number(),
  defense: z.number(),
  maxDefense: z.number(),
  magicAttack: z.number(),
  maxMagicAttack: z.number(),
  magicDefense: z.number(),
  maxMagicDefense: z.number(),
  dexterity: z.number(),
  evasion: z.number(),
  humanity: z.number(),
})

type Props = z.infer<typeof zProps>

/**
 * Character
 */
export class CharacterContext implements Props {
  readonly id!: Props["id"]

  readonly name!: Props["name"]

  readonly symbol!: Props["symbol"]

  readonly x!: Props["x"]

  readonly y!: Props["y"]

  readonly lifePoint!: Props["lifePoint"]

  readonly maxLifePoint!: Props["maxLifePoint"]

  /**
   * CD
   */
  readonly cooldownTime!: Props["cooldownTime"]

  readonly maxCooldownTime!: Props["maxCooldownTime"]

  readonly experiencePoint!: Props["experiencePoint"]

  /**
   * 攻撃力
   */
  readonly attack!: Props["attack"]

  readonly maxAttack!: Props["maxAttack"]

  /**
   * 防御力
   */
  readonly defense!: number

  readonly maxDefense!: Props["maxDefense"]

  readonly magicAttack!: Props["magicAttack"]

  readonly maxMagicAttack!: Props["maxMagicAttack"]

  readonly magicDefense!: Props["magicDefense"]

  readonly maxMagicDefense!: Props["maxMagicDefense"]

  readonly dexterity!: Props["dexterity"]

  readonly evasion!: Props["evasion"]

  /**
   * 人間性
   */
  readonly humanity!: Props["humanity"]

  constructor(props: Props) {
    zProps.parse(props)
    Object.assign(this, props)
    Object.freeze(this)
  }

  get lifePercentage(): number {
    return Math.floor((this.lifePoint / this.maxLifePoint) * 100)
  }

  get isDead() {
    return this.lifePoint < 1
  }

  get isActive() {
    return 0 < this.lifePoint
  }

  get level() {
    return Math.floor(1 + Math.sqrt(this.experiencePoint / 50))
  }

  static fromAsset(
    asset: z.infer<typeof characterAssetSchema>,
    props: {
      x: number
      y: number
    },
  ) {
    return new CharacterContext({
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
