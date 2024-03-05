import express from "express";
import * as path from "path";
import { EventsLogRepo } from "./repos/events-repo";
import { eventFilterSchema } from "./daos/event-filter";
import { eventSortSchema } from "./daos/event-sort";

const router = express.Router();

const eventsRepo = new EventsLogRepo(
  path.join(__dirname, "../data/events.log")
);

router.get("/log", async (req, res) => {
  try {
    const filtering = eventFilterSchema.optional().parse(req.query) ?? null;
    const sorting = eventSortSchema.optional().parse(req.query) ?? null;

    return res.json(eventsRepo.getFilteredAndSortedEvents(filtering, sorting));
  } catch (error: any) {
    console.error(error);
    return res
      .status(400)
      .json({ errors: error.errors.map((e: any) => e.message) });
  }
});

export default router;
