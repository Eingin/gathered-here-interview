import fs from "fs";
import path from "path";

import { EventsLogRepo } from "./events-repo";

describe("EventsLogRepo", () => {
  let repo: EventsLogRepo;
  let readFileSyncSpy: jest.SpyInstance;

  const testFilePath = path.join(__dirname, "test.log");

  beforeAll(() => {
    readFileSyncSpy = jest.spyOn(fs, "readFileSync");

    readFileSyncSpy.mockReturnValue(
      "2024-03-11T07:26:57 - User 1 Event: test\n2024-03-11T07:28:33 - User 2 Event: test2"
    );
  });

  afterAll(() => {
    readFileSyncSpy.mockRestore();
  });

  beforeEach(() => {
    repo = new EventsLogRepo(testFilePath);
  });

  it("should return event count", () => {
    expect(repo.getEventCount()).toBe(2);
  });

  it("should load events from file", () => {
    expect(repo.getAllEvents().length).toBe(2);
  });
  it("should filter events by type", () => {
    const page = repo.getFilteredAndSortedEvents(
      {
        eventType: "test",
      },
      null
    );
    expect(page.length).toBe(1);
  });

  it("should filter events by user", () => {
    const page = repo.getFilteredAndSortedEvents(
      {
        userId: 2,
      },
      null
    );
    expect(page.length).toBe(1);
  });

  it("should filter events by start date", () => {
    const page = repo.getFilteredAndSortedEvents(
      {
        startDate: new Date("2024-03-11T07:28:32"),
      },
      null
    );
    expect(page.length).toBe(1);
  });

  it("should filter events by end date", () => {
    const page = repo.getFilteredAndSortedEvents(
      {
        endDate: new Date("2024-03-11T07:28:32"),
      },
      null
    );
    expect(page.length).toBe(1);
  });

  it("should sort events by timestamp in ascending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "timestamp",
      sortOrder: "ASC",
    });
    expect(page[0].timestamp.getTime()).toBeLessThan(
      page[1].timestamp.getTime()
    );
  });

  it("should sort events by timestamp in descending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "timestamp",
      sortOrder: "DESC",
    });
    expect(page[0].timestamp.getTime()).toBeGreaterThan(
      page[1].timestamp.getTime()
    );
  });

  it("should sort events by eventType in ascending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "eventType",
      sortOrder: "ASC",
    });
    expect(page[0].eventType.localeCompare(page[1].eventType)).toBeLessThan(0);
  });

  it("should sort events by eventType in descending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "eventType",
      sortOrder: "DESC",
    });
    expect(page[0].eventType.localeCompare(page[1].eventType)).toBeGreaterThan(
      0
    );
  });

  it("should sort events by userId in ascending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "userId",
      sortOrder: "ASC",
    });
    expect(page[0].userId).toBeLessThan(page[1].userId);
  });

  it("should sort events by userId in descending order", () => {
    const page = repo.getFilteredAndSortedEvents(null, {
      sortBy: "userId",
      sortOrder: "DESC",
    });
    expect(page[0].userId).toBeGreaterThan(page[1].userId);
  });
});
