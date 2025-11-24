import { z } from 'zod';

import { BadRequestError } from '../errors.js';

const activityKindPayload = z.strictObject({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
});

const activityPayload = z.strictObject({
  when: z.iso.date('Format must be YYYY-MM-DD'),
  kindId: z.uuidv4(),
  title: z.string().min(2).max(50).trim(),
  description: z.string().trim().optional(),
  distance: z.number().optional(),
  duration: z.iso.time('Format must be hh:mm or hh:mm:ss'),
  elevation: z.int().gte(0).optional(),
  calories: z.int().gte(0).optional(),
});

export const validateActivityBody = (req, res, next) => {
  const { body } = req;
  const vld = activityPayload.safeParse(body);
  if (!vld.success) return next(new BadRequestError('Faulty data', vld.error.issues));
  next();
};

export const validateActivityKindBody = (req, res, next) => {
  const { body } = req;
  const vld = activityKindPayload.safeParse(body);
  if (!vld.success) return next(new BadRequestError('Faulty data', vld.error.issues));
  next();
};

export const validateUUIDParam = (req, res, next) => {
  const { id } = req.params;
  const vld = z.uuidv4().safeParse(id);
  if (!vld.success) return next(new BadRequestError('Id param must be UUID'));
  next();
};
