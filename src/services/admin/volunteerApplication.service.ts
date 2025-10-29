import { inject, injectable } from "tsyringe";
import { MessageService } from "../../utils/MessageService";
import { VolunteerApplicationModel } from "../../entities/volunteerApplication.schema";
import { VolunteerApplicationStatus } from "../../types/admin/volunteerApplication.types";

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
        search
    }: {
        limit?: number;
        offset?: number;
        search?: string
    }) {
        try {
            const safeSearch = typeof search === "string" ? search.trim() : "";
            const [applications, total] = await Promise.all([
                VolunteerApplicationModel.find({
                    isDelete: false,
                    $or: [
                        { fullName: { $regex: safeSearch, $options: "i" } },
                        { email: { $regex: safeSearch, $options: "i" } },
                        { phone: { $regex: safeSearch, $options: "i" } },
                    ],
                })
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit),
                VolunteerApplicationModel.countDocuments({
                    isDelete: false,
                    $or: [
                        { fullName: { $regex: safeSearch, $options: "i" } },
                        { email: { $regex: safeSearch, $options: "i" } },
                    ],
                }),
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

    async toggleVolunteerApplicationStatusService({ id, status }: { id: string; status: VolunteerApplicationStatus }) {
        try {
            const updated = await VolunteerApplicationModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );

            if (!updated) {
                return {
                    success: false,
                    message: "Volunteer application not found.",
                    data: null,
                };
            }

            return {
                success: true,
                message: `Volunteer application status updated to ${status}.`,
                data: updated,
            };
        } catch (error) {
            console.error("Error in toggleVolunteerApplicationStatusService:", error);
            return {
                success: false,
                message: "Failed to update application status.",
                data: null,
            };
        }
    }

    async deleteVolunteerApplicationService(id: string) {
        try {
            const deleted = await VolunteerApplicationModel.findByIdAndUpdate(
                id,
                { isDelete: true },
                { new: true }
            );

            if (!deleted) {
                return {
                    success: false,
                    message: "Volunteer application not found.",
                    data: null,
                };
            }

            return {
                success: true,
                message: "Volunteer application deleted successfully.",
                data: deleted,
            };
        } catch (error) {
            console.error("Error in deleteVolunteerApplicationService:", error);
            return {
                success: false,
                message: "Failed to delete volunteer application.",
                data: null,
            };
        }
    }


}
