import { z } from "zod"
const zProps = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  x: z.number(),
  y: z.number(),
  direction: z.string(),
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
 * Actor
 */
export class ActorContext implements Props {
  readonly id!: Props["id"]

  readonly name!: Props["name"]

  readonly symbol!: Props["symbol"]

  readonly x!: Props["x"]

  readonly y!: Props["y"]

  readonly direction!: Props["direction"]

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
}
