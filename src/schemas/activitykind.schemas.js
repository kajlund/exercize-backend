import { z } from 'zod';

export const newActivityKindSchema = z.strictObject({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
});
