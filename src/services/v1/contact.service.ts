import { inject, injectable } from "tsyringe";
import { MessageService } from "../../utils/MessageService";
import { ContactDocument, ContactModel } from "../../entities/contact.schema";

@injectable()
export class ContactService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    async createContactService(payload: {
        name: string;
        email: string;
        phoneNo: string;
        subject: string;
        message: string;
    }): Promise<{ success: boolean; message: string; data: ContactDocument | null }> {
        try {
            const newContact = await ContactModel.create(payload);
            return {
                success: true,
                message: this.messageService.CONTACT_CREATE_SUCCESS,
                data: newContact,
            };
        } catch (error) {
            console.error("Error in createContactService:", error);
            return {
                success: false,
                message: this.messageService.CONTACT_CREATE_ERROR,
                data: null,
            };
        }
    }

}
