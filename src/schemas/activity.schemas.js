import { z } from 'zod';

export const newActivitySchema = z.strictObject({
  when: z.iso.date('Format must be YYYY-MM-DD'),
  kindId: z.uuidv4(),
  title: z.string().min(2).max(50).trim(),
  description: z.string().trim().optional(),
  distance: z.number().optional(),
  duration: z.iso.time('Format must be hh:mm or hh:mm:ss'),
  elevation: z.int().gte(0).optional(),
  calories: z.int().gte(0).optional(),
  threadmill: z.stringbool().optional(),
});
