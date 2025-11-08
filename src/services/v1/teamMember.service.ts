import { inject, injectable } from "tsyringe";
import { TeamMemberModel, TeamMemberDocument } from "../../entities/teamMember.schema";
import { MessageService } from "../../utils/MessageService";
import dotenv from 'dotenv';

dotenv.config();

@injectable()
export class TeamMemberService {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates team member
     */
    async createTeamMemberService(teamMemberData: {
        name: string;
        role?: string;
        address: { city: string; state: string; postalCode: string };
        bloodGroup: string;
        birthdate: Date;
        phoneNo: string;
        occupation: string;
        skills: string[];
        image?: string;
        memberType: string;

    }): Promise<{ success: boolean; message: string; data: TeamMemberDocument | null }> {
        try {
            const existingTeamMember = await TeamMemberModel.findOne({ name: teamMemberData.name });

            if (existingTeamMember) {

                return {
                    success: false,
                    message: this.messageService.TEAM_MEMBER_ALREADY_EXIST,
                    data: null
                };
            }

            const newTeamMember = await TeamMemberModel.create(teamMemberData);

            return {
                success: true,
                message: this.messageService.TEAM_MEMBER_CREATE_SUCCESS,
                data: newTeamMember
            };
        } catch (error) {
            console.error('Error in createTeamMemberService:', error);
            return {
                success: false,
                message: this.messageService.TEAM_MEMBER_CREATE_ERROR,
                data: null
            };
        }
    }

    /**
     * Gets team member by id
     */
    async getTeamMemberByIdService({ id }: { id: string }): Promise<{ success: boolean; message: string; data?: TeamMemberDocument | null }> {
        try {
            const teamMember = await TeamMemberModel.findById(id)
                .select('_id name address bloodGroup birthdate occupation skills isActive phoneNo image email role memberType')
                .populate("image", "url filename mimetype");

            if (!teamMember || teamMember.isDelete) {
                return {
                    success: false,
                    message: this.messageService.TEAM_MEMBER_NOT_FOUND,
                    data: null
                };
            }
            return {
                success: true,
                message: this.messageService.TEAM_MEMBER_FETCH_SUCCESS,
                data: teamMember
            };
        } catch (error) {
            console.error('Error in getTeamMemberByIdService:', error);
            return {
                success: false,
                message: this.messageService.TEAM_MEMBER_FETCH_ERROR,
                data: null
            };
        }
    }

    /**
     * Gets all team members
     */
    async getAllTeamMembersService({ limit, offset, search, memberType }: { limit: number; offset: number, search: string, memberType: string }): Promise<{ success: boolean; message: string; data?: { teamMembers: TeamMemberDocument[] | null, totalCount: number } | null }> {
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
                : { isDelete: false, memberType };

            // total team members
            const totalCount = await TeamMemberModel.countDocuments(searchFilter);

            // fetch with pagination
            const teamMembers = await TeamMemberModel.find(searchFilter)
                .select("_id name address bloodGroup birthdate occupation skills isActive image phoneNo role memberType")
                .populate("image", "url filename mimetype")
                .skip(offset)
                .limit(limit)
                .lean();

            return {
                success: true,
                message: this.messageService.GET_ALL_TEAM_MEMBER_FETCH_SUCCESS,
                data: {
                    teamMembers,
                    totalCount
                }
            };
        } catch (error) {
            console.error("Error in getAllTeamMembersService:", error);
            return {
                success: false,
                message: this.messageService.GET_ALL_TEAM_MEMBER_FETCH_ERROR,
                data: null
            };
        }
    }

    /**
     * Updates team member by id
     */
    async updateTeamMemberById({ id, updateData }: { id: string, updateData: Partial<TeamMemberDocument> }): Promise<{ success: boolean; message: string; data?: TeamMemberDocument | null }> {
        try {
            const teamMember = await TeamMemberModel.findByIdAndUpdate(id, updateData, { new: true });
            if (!teamMember || teamMember.isDelete) {
                return { success: false, message: this.messageService.TEAM_MEMBER_NOT_FOUND };
            }

            const teamMemberData = await this.getTeamMemberByIdService({ id });
            return {
                success: true,
                message: this.messageService.TEAM_MEMBER_UPDATE_SUCCESS,
                data: teamMemberData.data
            };
        } catch (error) {
            console.error('Error in updateTeamMemberById:', error);
            return { success: false, message: this.messageService.TEAM_MEMBER_UPDATE_ERROR };
        }
    }

    /**
     * Deletes team member by id
     */
    async deleteTeamMemberById({ id }: { id: string }): Promise<{ success: boolean; message: string, data: null }> {
        try {
            const teamMember = await TeamMemberModel.findOneAndUpdate(
                { _id: id, isActive: true, isDelete: false },
                { isDelete: true, isActive: false },
                { new: true }
            );
            if (!teamMember) {
                return {
                    success: false,
                    message: this.messageService.TEAM_MEMBER_NOT_FOUND,
                    data: null
                };
            }
            return {
                success: true,
                message: this.messageService.TEAM_MEMBER_DELETE_SUCCESS,
                data: null
            };
        } catch (error) {
            console.error('Error in deleteTeamMemberById:', error);
            return {
                success: false,
                message: this.messageService.TEAM_MEMBER_DELETE_ERROR,
                data: null
            };
        }
    }
}
