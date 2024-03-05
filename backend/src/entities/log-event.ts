export type LogEvent = {
  timestamp: Date;
  userId: number;
  eventType: string;
  originalLine: string;
};
