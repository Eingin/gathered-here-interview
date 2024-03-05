import { z } from "zod";

export type EventFilterDto = {
  startDate?: Date;
  endDate?: Date;
  userId?: number;
  eventType?: string;
};

export const eventFilterSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  userId: z.coerce.number().optional(),
  eventType: z.string().optional(),
});
