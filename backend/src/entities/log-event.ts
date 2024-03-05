export type LogEvent = {
  timestamp: Date;
  userId: number;
  eventType: string;
  originalLine: string;
};

const logLineRegex =
  /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}) - User (\d+) Event: (.*)/;

export function parseLogLine(logLine: string): LogEvent {
  const match = logLine.match(logLineRegex);

  if (match) {
    return {
      timestamp: new Date(match[1]),
      userId: parseInt(match[2], 10),
      eventType: match[3],
      originalLine: logLine,
    };
  } else {
    throw new Error(`Invalid log line format: ${logLine}`);
  }
}
