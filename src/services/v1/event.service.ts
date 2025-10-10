import { inject, injectable } from "tsyringe";

import { EventDocument, EventModel } from "../../entities/event.schema";
import { MessageService } from "../../utils/MessageService";

@injectable()
export class EventService {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates event service
     * @param {
     *         name, category, date, location, image, description
     *     } 
     * @returns event service 
     */
    async createEventService({
        name, category, date, location, image, description
    }: {
        name: string; category: string; date: Date; location: string; image?: string; description?: any;
    }): Promise<{ success: boolean; message: string; data: EventDocument | null }> {

        try {
            const newEvent = await EventModel.create({
                name,
                category,
                date,
                location,
                image,
                description,
            });

            return {
                success: true,
                message: "Event created successfully",
                data: newEvent,
            };
        } catch (error) {
            console.error("Error in createEventService:", error);
            return {
                success: false,
                message: "Error creating event",
                data: null,
            };
        }
    }

    /**
     * Gets event by id service
     * @param { id } 
     * @returns event by id service 
     */
    async getEventByIdService({ id }: { id: string }): Promise<{ success: boolean; message: string; data?: EventDocument | null }> {
        try {
            const event = await EventModel.findById(id).populate("image");
            if (!event) {
                return { success: false, message: this.messageService.EVENT_NOT_FOUND };
            }
            return {
                success: true,
                message: this.messageService.EVENT_FETCH_SUCCESS,
                data: event,
            };
        } catch (error) {
            console.error("Error in getEventByIdService:", error);
            return { success: false, message: "Error fetching event", data: null };
        }
    }

    /**
     * Updates event service
     * @param id 
     * @param updateData 
     * @returns event service 
     */
    async updateEventService(
        id: string,
        updateData: Partial<EventDocument>
    ): Promise<{ success: boolean; message: string; data?: EventDocument | null }> {
        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(id, updateData, {
                new: true,
            }).populate("image");

            if (!updatedEvent) {
                return { success: false, message: this.messageService.EVENT_NOT_FOUND };
            }

            return {
                success: true,
                message: this.messageService.EVENT_UPDATE_SUCCESS,
                data: updatedEvent,
            };
        } catch (error) {
            console.error("Error in updateEventService:", error);
            return {
                success: false,
                message: this.messageService.EVENT_UPDATE_ERROR,
                data: null,
            };
        }
    }

    /**
     * Gets all events
     * @returns all events 
     */
    async getAllEvents({ limit, offset, search = "", }: { limit: number; offset: number; search?: string; }): Promise<{
        success: boolean;
        message: string;
        data?: { events: EventDocument[]; totalCount: number } | null;
    }> {
        try {
            // 1. Build filter
            const filter: any = { isDelete: false, isActive: true };

            // 2. Add search filter if search query exists
            if (search && search.trim().length > 0) {
                filter.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } },
                ];
            }

            // 3. Get total count before applying limit/offset
            const totalCount = await EventModel.countDocuments(filter);

            // 4. Fetch events with pagination + sorting
            const events = await EventModel.find(filter)
                .populate("image")
                .sort({ createdAt: -1 }) // latest first
                .skip(offset)
                .limit(limit);

            if (!events || events.length === 0) {
                return { success: false, message: this.messageService.EVENT_NOT_FOUND };
            }

            // 5. Return data with total count
            return {
                success: true,
                message: this.messageService.EVENT_FETCH_SUCCESS,
                data: {
                    events,
                    totalCount,
                },
            };
        } catch (error) {
            console.error("Error in getAllEvents:", error);
            return { success: false, message: "Error fetching events", data: null };
        }
    }


    /**
     * Deletes event service
     * @param id 
     * @returns event service 
     */
    async deleteEventService(id: string): Promise<{ success: boolean; message: string; data: EventDocument | null }> {
        try {
            const event = await EventModel.findByIdAndUpdate(
                id,
                { isDeleted: true, isActive: false },
                { new: true }
            );

            if (!event) {
                return { success: false, message: "Event not found", data: null };
            }

            return { success: true, message: "Event deleted successfully", data: event };
        } catch (error) {
            console.error("Error in deleteEventService:", error);
            return { success: false, message: "Error deleting event", data: null };
        }
    }

}
