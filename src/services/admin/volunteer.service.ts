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
        phoneNo: string;
        occupation: string;
        skills: string[];
        image?: string;
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
            const volunteer = await VolunteerModel.findById(id).select('_id name address bloodGroup birthdate occupation skills isActive phoneNo image').populate("image", "url filename mimetype");
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
     * Gets all volunteers service
     * @returns all volunteers service 
     */
    async getAllVolunteersService({ limit, offset, search }: { limit: number; offset: number, search: string }): Promise<{ success: boolean; message: string; data?: { volunteers: VolunteerDocument[] | null, totalCount: number } | null }> {
        try {
            const searchFilter = search
                ? {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { address: { $regex: search, $options: "i" } },
                        { occupation: { $regex: search, $options: "i" } },
                        { skills: { $regex: search, $options: "i" } },
                        { phoneNo: { $regex: search, $options: "i" } },
                    ],
                    isDelete: false,
                }
                : { isDelete: false };
            // total volunteers
            const totalCount = await VolunteerModel.countDocuments(searchFilter);

            // fetch with pagination
            const volunteers = await VolunteerModel.find({ isDelete: false })
                .select("_id name address bloodGroup birthdate occupation skills isActive image phoneNo")
                .populate("image", "url filename mimetype")
                .skip(offset)
                .limit(limit)
                .lean();

            return {
                success: true,
                message: this.messageService.VOLUNTEER_ALL_FETCH_SUCCESS,
                data: {
                    volunteers,
                    totalCount
                }
            };
        } catch (error) {
            console.error("Error in getAllVolunteersService:", error);
            return {
                success: false,
                message: this.messageService.VOLUNTEER_ALL_FETCH_ERROR,
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
    async deleteVolunteerById({ id }: { id: string }): Promise<{ success: boolean; message: string, data: null }> {
        try {
            const volunteer = await VolunteerModel.findOneAndUpdate(
                { _id: id, isActive: true, isDelete: false },
                { isDelete: true, isActive: false },
                { new: true }
            );
            if (!volunteer) {
                return {
                    success: false,
                    message: this.messageService.VOLUNTEER_NOT_FOUND,
                    data: null
                };
            }
            return {
                success: true,
                message: this.messageService.VOLUNTEER_DELETE_SUCCESSFULLY,
                data: null
            };
        } catch (error) {
            console.error('Error in deleteVolunteerById:', error);
            return {
                success: false,
                message: this.messageService.VOLUNTEER_DELETE_ERROR,
                data: null
            };
        }
    }
}
