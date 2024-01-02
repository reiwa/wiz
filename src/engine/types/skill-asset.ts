import { z } from "zod"
import { skillAssetSchema } from "../schemas/skill-asset-schema.js"

export type SkillAsset = z.infer<typeof skillAssetSchema>
