import { z } from "zod"

export const characterAssetSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  experience_point: z.number(),
  hint: z.string(),
  cooldown_time: z.number(),
  life_point: z.number(),
  life_point_change_rate: z.number(),
  current_life_point: z.number(),
  attack_change_rate: z.number(),
  attack: z.number(),
  current_attack: z.number(),
  defense: z.number(),
  defense_change_rate: z.number(),
  current_defense: z.number(),
  magic_attack: z.number(),
  magic_attack_change_rate: z.number(),
  magic_defense: z.number(),
  magic_defense_change_rate: z.number(),
  evasion: z.number(),
  evasion_change_rate: z.number(),
  dexterity: z.number(),
  dexterity_change_rate: z.number(),
  humanity: z.number(),
  humanity_change_rate: z.number(),
})
