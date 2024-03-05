import express from "express";
import * as path from "path";
import { EventsLogRepo } from "./repos/events-repo";

const router = express.Router();

const eventsRepo = new EventsLogRepo(
  path.join(__dirname, "../data/events.log")
);

router.get("/log", async (req, res) => {
  res.json(eventsRepo.getAllEvents());
});

export default router;
