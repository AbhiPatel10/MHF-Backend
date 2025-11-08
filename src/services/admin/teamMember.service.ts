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
}
