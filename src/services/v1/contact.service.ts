import { inject, injectable } from 'tsyringe';
import { MessageService } from '../../utils/MessageService';
import { ContactDocument, ContactModel } from '../../entities/contact.schema';
import { sendEmail } from '../../utils/sendEmail';

@injectable()
export class ContactService {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  async createContactService(payload: {
    name: string;
    email: string;
    phoneNo: string;
    subject: string;
    message: string;
  }): Promise<{
    success: boolean;
    message: string;
    data: ContactDocument | null;
  }> {
    try {
      const newContact = await ContactModel.create(payload);
      await sendEmail(payload?.email, payload?.subject, payload?.message);
      await sendEmail(
        'missionhope07@gmail.com',
        `New Contact Form Submission - ${payload?.subject ?? 'No Subject'}`,
        `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${payload?.name}</p>
        <p><b>Email:</b> ${payload?.email}</p>
        <p><b>Phone:</b> ${payload?.phoneNo}</p>
        <p><b>Subject:</b> ${payload?.subject}</p>
        <p><b>Message:</b><br>${payload?.message}</p>
      `
      );
      return {
        success: true,
        message: this.messageService.CONTACT_CREATE_SUCCESS,
        data: newContact,
      };
    } catch (error) {
      console.error('Error in createContactService:', error);
      return {
        success: false,
        message: this.messageService.CONTACT_CREATE_ERROR,
        data: null,
      };
    }
  }
}
