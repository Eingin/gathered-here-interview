import { Order } from "../constants/order";

export type EventSortingDto = {
  readonly sortBy: string;
  readonly sortOrder: Order;
};
