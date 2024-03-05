import { Order } from "../constants/order";

export type LogsForm = {
  startDate?: Date;
  endDate?: Date;
  userId?: number;
  eventType?: string;

  sortBy?: string;
  sortOrder?: Order;
};
