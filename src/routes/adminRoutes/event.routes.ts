import { Router } from "express";
import { EventController } from "../../controllers/admin/event.controller";
import { EventValidator } from "../../validations/admin/event.validation";
import { container } from "tsyringe";

const router = Router();

const eventController = container.resolve(EventController);
const eventValidator = container.resolve(EventValidator);

router.post("/createEvent", eventValidator.createEventValidator, eventController.createEventController);
router.get("/getEventDetails/:id", eventController.getEventByIdController);
router.put("/updateEvent/:id", eventController.updateEventController);
router.get("/getAllEvents", eventController.getAllEventsController);
router.delete("/deleteEvent/:id", eventController.deleteEventController);

export default router;
