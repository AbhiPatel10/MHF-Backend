import { inject, injectable } from "tsyringe";
import { BlogDocument, BlogModel } from "../../entities/blog.schema";
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
        whatsapp?: string;
        bloodGroup?: string;
        address: string;
        city: string;
        state: string;
        country: string;
        countryCode: string;
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
}
