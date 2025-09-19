import { Request, Response } from "express";
import { injectable } from "tsyringe";

import { sendResponse } from "../../utils/response";
import { EventService } from "../../services/admin/event.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class EventController {
    private eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    /**
     * Create event controller of event controller
     */
    createEventController = async (req: Request, res: Response) => {
        try {
            const { name, category, date, location, image, description } = req.body;

            const { success, data, message } = await this.eventService.createEventService({
                name,
                category,
                date,
                location,
                image,
                description,
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in createEventController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get event by id controller of event controller
     */
    getEventByIdController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { success, message, data } = await this.eventService.getEventByIdService({ id });

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getEventByIdController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Update event controller of event controller
     */
    updateEventController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const { success, message, data } = await this.eventService.updateEventService(
                id,
                updateData
            );

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in updateEventController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get all events controller of event controller
     */
    getAllEventsController = async (req: Request, res: Response) => {
        try {
            const { message, success, data } = await this.eventService.getAllEvents();

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error: any) {
            console.log("Error in getAllEventsController:", error);
            handleControllerError(error, res);
        }
    }

    /**
     * Delete event controller of event controller
     */
    deleteEventController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return sendResponse({
                    res,
                    status: 400,
                    message: "Event ID is required",
                    data: null,
                });
            }

            const { success, data, message } = await this.eventService.deleteEventService(id);

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in deleteEventController:", error);
            handleControllerError(error, res);
        }
    };

}
