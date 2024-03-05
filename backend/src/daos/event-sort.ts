import { z } from "zod";
import { Order } from "../constants/order";

export type EventSortingDto = {
  readonly sortBy: string;
  readonly sortOrder: Order;
};

export const eventSortSchema = z.object({
  sortBy: z
    .enum(["timestamp", "userId", "eventType"])
    .optional()
    .default("timestamp"),
  sortOrder: z.enum(["ASC", "DESC"]).optional().default("ASC"),
});
