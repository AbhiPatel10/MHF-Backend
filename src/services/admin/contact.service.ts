import { inject, injectable } from "tsyringe";
import { MessageService } from "../../utils/MessageService";
import { ContactDocument, ContactModel } from "../../entities/contact.schema";

@injectable()
export class ContactService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    async getAllContactsService({ limit, offset, search, isContacted }: { limit: number; offset: number; search: string; isContacted?: boolean })
        : Promise<{ success: boolean; message: string; data: { contacts: ContactDocument[]; totalCount: number } | null }> {
        try {
            const query: any = { isDelete: false };

            // search filter
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { phoneNo: { $regex: search, $options: "i" } },
                    { subject: { $regex: search, $options: "i" } },
                ];
            }

            // filter by isContacted
            if (typeof isContacted === "boolean") {
                query.isContacted = isContacted;
            }

            const totalCount = await ContactModel.countDocuments(query);

            const contacts = await ContactModel.find(query)
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 });

            return {
                success: true,
                message: this.messageService.CONTACT_FETCH_SUCCESS,
                data: { contacts, totalCount },
            };
        } catch (error) {
            console.error("Error in getAllContactsService:", error);
            return {
                success: false,
                message: this.messageService.CONTACT_FETCH_ERROR,
                data: null,
            };
        }
    }

    async updateStatusService(id: string, isContacted: boolean)
        : Promise<{ success: boolean; message: string; data: ContactDocument | null }> {
        try {
            const updated = await ContactModel.findByIdAndUpdate(id, { isContacted }, { new: true });
            if (!updated) {
                return {
                    success: false,
                    message: this.messageService.CONTACT_NOT_EXIST,
                    data: null,
                };
            }
            return {
                success: true,
                message: this.messageService.CONTACT_UPDATE_SUCCESS,
                data: updated,
            };
        } catch (error) {
            console.error("Error in updateStatusService:", error);
            return {
                success: false,
                message: this.messageService.CONTACT_UPDATE_ERROR,
                data: null,
            };
        }
    }

    async deleteContactService(id: string): Promise<{ success: boolean; message: string }> {
        try {
            const contact = await ContactModel.findByIdAndUpdate(id, { isDelete: true, isActive: false });
            if (!contact) {
                return {
                    success: false,
                    message: this.messageService.CONTACT_NOT_EXIST,
                };
            }
            return {
                success: true,
                message: this.messageService.CONTACT_DELETE_SUCCESS,
            };
        } catch (error) {
            console.error("Error in deleteContactService:", error);
            return {
                success: false,
                message: this.messageService.CONTACT_DELETE_ERROR,
            };
        }
    }
}
