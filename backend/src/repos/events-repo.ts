import fs from "fs";
import { LogEvent, parseLogLine } from "../entities/log-event";

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

  public getAllEvents(): LogEvent[] {
    return this.events;
  }

  public getEventCount(): number {
    return this.events.length;
  }
}
