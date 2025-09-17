import { inject, injectable } from "tsyringe";
import { VolunteerModel, VolunteerDocument } from "../../entities/volunteer.schema";
import { MessageService } from "../../utils/MessageService";
import dotenv from 'dotenv';

dotenv.config();
@injectable()
export class VolunteerService {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates volunteer service
     * @param { name, email, password } 
     * @returns volunteer service 
     */
    async createVolunteerService(volunteerData: {
        name: string;
        address: { city: string; state: string; postalCode: string };
        bloodGroup: string;
        birthdate: Date;
        occupation: string;
        skills: string[];
    }): Promise<{ success: boolean; message: string; data?: VolunteerDocument | null }> {
        try {
            const existingVolunteer = await VolunteerModel.findOne({ name: volunteerData.name });
            if (existingVolunteer) {
                return { success: false, message: this.messageService.VOLUNTEER_ALREADY_EXIST };
            }

            const newVolunteer = await VolunteerModel.create(volunteerData);

            return {
                success: true,
                message: this.messageService.VOLUNTEER_CREATE_SUCCESSFULLY,
                data: newVolunteer
            };
        } catch (error) {
            console.error('Error in createVolunteerService:', error);
            return {
                success: false,
                message: this.messageService.VOLUNTEER_CREATE_ERROR,
                data: null
            };
        }
    }

    /**
     * Gets volunteer by id service
     * @param { id } 
     * @returns volunteer by id service 
     */
    async getVolunteerByIdService({ id }: { id: string }): Promise<{ success: boolean; message: string; data?: VolunteerDocument | null }> {
        try {
            const volunteer = await VolunteerModel.findById(id).select('_id name address bloodGroup birthdate occupation skills isActive');
            if (!volunteer || volunteer.isDelete) {
                return {
                    success: false,
                    message: this.messageService.VOLUNTEER_NOT_FOUND,
                    data: null
                };
            }
            return {
                success: true,
                message: this.messageService.VOLUNTEER_FETCH_SUCCESS,
                data: volunteer
            };
        } catch (error) {
            console.error('Error in getVolunteerByIdService:', error);
            return {
                success: false,
                message: this.messageService.VOLUNTEER_FETCH_ERROR,
                data: null
            };
        }
    }

    /**
     * Updates volunteer by id
     * @param id 
     * @param updateData 
     * @returns volunteer by id 
     */
    async updateVolunteerById({ id, updateData }: { id: string, updateData: Partial<VolunteerDocument> }): Promise<{ success: boolean; message: string; data?: VolunteerDocument | null }> {
        try {
            const volunteer = await VolunteerModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!volunteer || volunteer.isDelete) {
                return { success: false, message: this.messageService.VOLUNTEER_NOT_FOUND };
            }

            const volunteerData = await this.getVolunteerByIdService({ id });
            return {
                success: true,
                message: this.messageService.VOLUNTEER_UPDATE_SUCCESSFULLY,
                data: volunteerData.data
            };
        } catch (error) {
            console.error('Error in updateVolunteerById:', error);
            return { success: false, message: this.messageService.VOLUNTEER_UPDATE_ERROR };
        }
    }

    /**
     * Deletes volunteer by id
     * @param id 
     * @returns volunteer by id 
     */
    async deleteVolunteerById({ id }: { id: string }): Promise<{ success: boolean; message: string }> {
        try {
            const volunteer = await VolunteerModel.findOneAndUpdate(
                { _id: id, isActive: true, isDelete: false }, // only active + not deleted
                { isDelete: true, isActive: false },
                { new: true }
            );
            if (!volunteer) {
                return {
                    success: false,
                    message: 'Volunteer not found'
                };
            }
            return {
                success: true,
                message: 'Volunteer deleted successfully'
            };
        } catch (error) {
            console.error('Error in deleteVolunteerById:', error);
            return {
                success: false,
                message: 'Failed to delete volunteer'
            };
        }
    }
}
