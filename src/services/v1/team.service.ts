// import { inject, injectable } from "tsyringe";

// import { AppDataSource } from "../../config/database";
// import { MessageService } from "../../utils/MessageService";
// import { User } from "../../entities/user.entity";
// import { TeamMembers } from '../../entities/teamMembers.entity';
// import { Businesses } from '../../entities/businesses.entity';
// import { Image } from '../../entities/image.entity';
// import { ImageService } from './image.service';

// @injectable()
// export class TeamService {
//     private readonly teamMembersRepository = AppDataSource.getRepository(TeamMembers);
//     private readonly imageRepository = AppDataSource.getRepository(Image);


//     constructor(
//         @inject(MessageService) private readonly messageService: MessageService,
//         @inject(ImageService) private readonly imageService: ImageService,
//     ) { }

//     /**
//      * Adds team member service
//      * @param dto 
//      * @returns team member service 
//      */
//     async addTeamMemberService({ name, about, businessId, createdBy, experience, imageId, qualification, specialization }: {
//         name: string; qualification?: string; specialization?: string; experience?: string; about?: string; imageId?: number; createdBy?: number; businessId?: number;
//     }): Promise<{ success: boolean; message: string; data: TeamMembers | null }> {
//         try {
//             const teamMember = this.teamMembersRepository.create({
//                 name: name,
//                 qualification: qualification,
//                 specialization: specialization,
//                 experience: experience,
//                 about: about,
//                 createdBy: createdBy ? ({ userId: createdBy } as User) : undefined,
//                 business: businessId ? ({ businessId: businessId } as Businesses) : undefined,
//             });

//             if (imageId) {
//                 const image = await this.imageRepository.findOne({ where: { imageId: imageId } });
//                 if (image) teamMember.image = image;
//             }

//             const savedTeamMember = await this.teamMembersRepository.save(teamMember);

//             const teamMemberDetails = await this.getTeamMemberDetailsService({ teamMemberId: savedTeamMember.teamMemberId ?? 0 });

//             return {
//                 success: true,
//                 message: this.messageService.TEAM_MEMBER_CREATE_SUCCESS,
//                 data: teamMemberDetails.data
//             };
//         } catch (error) {
//             console.error('----- addTeamMemberService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.TEAM_MEMBER_CREATE_ERROR,
//                 data: null
//             };
//         }
//     }


//     async updateTeamMemberService(
//         teamMemberId: number,
//         dto: {
//             name?: string;
//             qualification?: string;
//             specialization?: string;
//             experience?: number;
//             about?: string;
//             imageId?: number;
//             modifiedBy?: number;
//         },
//     ): Promise<{ success: boolean; message: string; data: TeamMembers | null }> {
//         try {
//             const teamMember = await this.teamMembersRepository.findOne({ where: { teamMemberId, isActive: true, isDelete: false }, relations: ['image'] });
//             if (!teamMember) {
//                 return {
//                     success: false,
//                     message: this.messageService.TEAM_MEMBER_NOT_FOUND,
//                     data: null
//                 };
//             }

//             if (dto.imageId !== undefined) {
//                 if (dto.imageId === null) {
//                     // remove existing image
//                     if (teamMember.image) {
//                         await this.imageService.imageDeleteService({ imageId: teamMember.image.imageId });
//                         teamMember.image = null;
//                     }
//                 } else {
//                     // replace with new image
//                     const newImage = await this.imageRepository.findOne({ where: { imageId: dto.imageId } });
//                     if (newImage) {
//                         // delete old one if exists
//                         if (teamMember.image && teamMember.image.imageId !== newImage.imageId) {
//                             await this.imageService.imageDeleteService({ imageId: teamMember.image.imageId });
//                         }
//                         teamMember.image = newImage;
//                     }
//                 }
//             }

//             if (dto.modifiedBy) {
//                 teamMember.modifiedBy = { userId: dto.modifiedBy } as User;
//             }

//             Object.assign(teamMember, dto);

//             const updatedTeamMember = await this.teamMembersRepository.save(teamMember);

//             const teamMemberDetails = await this.getTeamMemberDetailsService({ teamMemberId: updatedTeamMember.teamMemberId ?? 0 });

//             return {
//                 success: true,
//                 message: this.messageService.TEAM_MEMBER_UPDATE_SUCCESS,
//                 data: teamMemberDetails.data
//             };
//         } catch (error) {
//             console.error('----- updateTeamMemberService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.TEAM_MEMBER_UPDATE_ERROR,
//                 data: null
//             };
//         }
//     }

//     async getAllTeamMembersService({
//         businessId,
//     }: {
//         businessId?: number;
//     }): Promise<{ success: boolean; message: string; data: { teamMembers: TeamMembers[] } | null }> {
//         try {
//             const qb = this.teamMembersRepository
//                 .createQueryBuilder('team')
//                 .leftJoinAndSelect('team.image', 'image')
//                 .where('team.isDelete = :isDelete', { isDelete: false });

//             if (businessId) {
//                 qb.andWhere('team.businessId = :businessId', { businessId });
//             }

//             const teamMembers = await qb
//                 .select([
//                     'team.teamMemberId',
//                     'team.name',
//                     'team.qualification',
//                     'team.specialization',
//                     'team.experience',
//                     'team.about',
//                     'team.isActive',
//                     'image.imageId',
//                     'image.url',
//                 ])
//                 .getMany();

//             return {
//                 success: true,
//                 message: this.messageService.GET_ALL_TEAM_MEMBER_FETCH_SUCCESS,
//                 data: {
//                     teamMembers
//                 }
//             };
//         } catch (error) {
//             console.error('----- getAllTeamMembersService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.GET_ALL_TEAM_MEMBER_FETCH_ERROR,
//                 data: null
//             };
//         }
//     }

//     async getTeamMemberDetailsService({ teamMemberId }: { teamMemberId: number }): Promise<{ success: boolean; message: string; data: TeamMembers | null }> {
//         try {
//             const teamMemberDetails = await this.teamMembersRepository
//                 .createQueryBuilder('team')
//                 .leftJoinAndSelect('team.image', 'image')
//                 .where('team.teamMemberId = :teamMemberId', { teamMemberId })
//                 .andWhere('team.isDelete = :isDelete', { isDelete: false })
//                 .select([
//                     'team.teamMemberId',
//                     'team.name',
//                     'team.qualification',
//                     'team.specialization',
//                     'team.experience',
//                     'team.about',
//                     'team.isActive',
//                     'image.imageId',
//                     'image.url',
//                 ])
//                 .getOne();

//             if (!teamMemberDetails) {
//                 return {
//                     success: false,
//                     message: this.messageService.TEAM_MEMBER_NOT_FOUND,
//                     data: null
//                 };
//             }

//             return {
//                 success: true,
//                 message: this.messageService.TEAM_MEMBER_FETCH_SUCCESS,
//                 data: teamMemberDetails
//             };
//         } catch (error) {
//             console.error('----- getTeamMemberDetailsService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.TEAM_MEMBER_FETCH_ERROR,
//                 data: null
//             };
//         }
//     }

//     async deleteTeamMemberService({
//         teamMemberId,
//         modifiedBy,
//     }: {
//         teamMemberId: number;
//         modifiedBy?: number;
//     }): Promise<{ success: boolean; message: string; data: null }> {
//         try {
//             const teamMember = await this.teamMembersRepository.findOne({
//                 where: { teamMemberId, isActive: true, isDelete: false },
//                 relations: ["image"],
//             });

//             if (!teamMember) {
//                 return {
//                     success: false,
//                     message: this.messageService.TEAM_MEMBER_NOT_FOUND,
//                     data: null,
//                 };
//             }

//             // Delete image if exists
//             if (teamMember.image) {
//                 await this.imageService.imageDeleteService({
//                     imageId: teamMember.image.imageId,
//                 });
//                 teamMember.image = null;
//             }

//             // Soft delete
//             teamMember.isDelete = true;
//             if (modifiedBy) {
//                 teamMember.modifiedBy = { userId: modifiedBy } as User;
//             }

//             await this.teamMembersRepository.save(teamMember);

//             return {
//                 success: true,
//                 message: this.messageService.TEAM_MEMBER_DELETE_SUCCESS,
//                 data: null,
//             };
//         } catch (error) {
//             console.error("----- deleteTeamMemberService Error:", error);
//             return {
//                 success: false,
//                 message: this.messageService.TEAM_MEMBER_DELETE_ERROR,
//                 data: null,
//             };
//         }
//     }
// }
