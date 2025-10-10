import { container } from "tsyringe";
import { Router } from "express";

import { EventController } from "../../controllers/v1/event.controller";

const router = Router();

const eventController = container.resolve(EventController);

router.get("/getEventDetails/:id", eventController.getEventByIdController);
router.get("/getAllEvents", eventController.getAllEventsController);

export default router;
