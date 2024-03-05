import fs from "fs";
import { LogEvent, parseLogLine } from "../entities/log-event";
import { EventSortingDto } from "../daos/event-sort";
import { EventFilterDto } from "../daos/event-filter";

export class EventsLogRepo {
  private readonly events: LogEvent[];

  constructor(filePath: string) {
    const rawFile = fs.readFileSync(filePath, "utf-8");
    this.events = rawFile
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map<LogEvent>((line) => parseLogLine(line));
    console.log(`Loaded ${this.events.length} events from ${filePath}`);
  }

  public getFilteredAndSortedEvents(
    filter: EventFilterDto | null,
    sorting: EventSortingDto | null
  ): LogEvent[] {
    const filteredEvents = filter
      ? this.events.filter((event) => {
          if (filter.startDate && event.timestamp < filter.startDate) {
            return false;
          }
          if (filter.endDate && event.timestamp > filter.endDate) {
            return false;
          }
          if (filter.userId && event.userId !== filter.userId) {
            return false;
          }
          if (filter.eventType && event.eventType !== filter.eventType) {
            return false;
          }
          return true;
        })
      : this.events;

    if (sorting) {
      filteredEvents.sort((a, b) => {
        if (sorting.sortBy === "timestamp") {
          return sorting.sortOrder === "ASC"
            ? a.timestamp.getTime() - b.timestamp.getTime()
            : b.timestamp.getTime() - a.timestamp.getTime();
        }
        if (sorting.sortBy === "eventType") {
          return sorting.sortOrder === "ASC"
            ? a.eventType.localeCompare(b.eventType)
            : b.eventType.localeCompare(a.eventType);
        }
        if (sorting.sortBy === "userId") {
          return sorting.sortOrder === "ASC"
            ? a.userId - b.userId
            : b.userId - a.userId;
        }
        return 0;
      });
    }

    return filteredEvents;
  }

  public getAllEvents(): LogEvent[] {
    return this.events;
  }

  public getEventCount(): number {
    return this.events.length;
  }
}
