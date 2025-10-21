import { inject, injectable } from "tsyringe";
import { MessageService } from "../../utils/MessageService";
import { VolunteerApplicationModel } from "../../entities/volunteerApplication.schema";

@injectable()
export class VolunteerApplicationService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Gets blog by id service
     * @param { id } 
     * @returns  
     */
    async applyAsVolunteerService(payload: {
        fullName: string;
        email: string;
        phone: string;
        reason?: string;
    }) {
        try {
            const newApplication = await VolunteerApplicationModel.create(payload);
            return {
                success: true,
                message: this.messageService.APPLY_SUCCESS,
                data: newApplication,
            };
        } catch (error) {
            console.error("Error in applyAsVolunteerService:", error);
            return {
                success: false,
                message: this.messageService.APPLY_ERROR,
                data: null,
            };
        }
    }

    async getVolunteerApplicationsService({
        limit = 10,
        offset = 0,
    }: {
        limit?: number;
        offset?: number;
    }) {
        try {
            const [applications, total] = await Promise.all([
                VolunteerApplicationModel.find({ isDelete: false })
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit),
                VolunteerApplicationModel.countDocuments({ isDelete: false }),
            ]);

            return {
                success: true,
                message: "Volunteer applications fetched successfully.",
                data: {
                    total,
                    applications,
                },
            };
        } catch (error) {
            console.error("Error in getVolunteerApplicationsService:", error);
            return {
                success: false,
                message: "Failed to fetch volunteer applications.",
                data: null,
            };
        }
    }

}
