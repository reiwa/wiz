import { z } from "zod"

export const skillAssetSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  target: z.string(),
  attribute: z.string().nullable(),
})
