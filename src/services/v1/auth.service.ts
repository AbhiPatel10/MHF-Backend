// import bcrypt from 'bcrypt';
// import { inject, injectable } from "tsyringe";
// import jwt from 'jsonwebtoken';

// import { AppDataSource } from "../../config/database";
// import { MessageService } from "../../utils/MessageService";
// import { User } from "../../entities/user.entity";
// import { UserOTP } from "../../entities/userOtp.entity";
// import { generateOTP } from "../../utils/helper/helper";
// import { TLoginResponse, TVerifyOTPResponse } from '../../types/authTypes';


// @injectable()
// export class AuthService {
//     private readonly userRepository = AppDataSource.getRepository(User);
//     private readonly userOTPRepository = AppDataSource.getRepository(UserOTP);

//     private readonly saltRounds = 10;
//     private readonly jwtSecret = process.env.JWT_SECRET ?? "";

//     constructor(
//         @inject(MessageService) private readonly messageService: MessageService,
//     ) { }

//     async createUserService({ name, phoneNo, password }: { name: string, phoneNo: string, password: string }): Promise<{ success: boolean, message: string, data: null }> {
//         try {

//             const existingUser = await this.userRepository.findOne({ where: { phoneNo, isActive: true, isDelete: false } });

//             if (existingUser) {
//                 return {
//                     success: false,
//                     message: this.messageService.USER_ALREADY_EXIST,
//                     data: null
//                 }
//             }

//             const hashedPassword = await bcrypt.hash(password, this.saltRounds);

//             const userData = this.userRepository.create({
//                 name,
//                 phoneNo,
//                 password: hashedPassword,
//             })
//             await this.userRepository.save(userData);

//             return {
//                 success: true,
//                 data: null,
//                 message: this.messageService.USER_CREATE_SUCCESS
//             }
//         } catch (error) {
//             console.error('----- createUserService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.USER_CREATE_ERROR,
//                 data: null
//             }
//         }
//     }

//     async loginUserService({ phoneNo, password }: { phoneNo: string, password: string }): Promise<TLoginResponse> {
//         try {

//             const existingUser = await this.userRepository.findOne({
//                 where: { phoneNo, isActive: true, isDelete: false },
//                 relations: ["image", "business"],
//                 select: ["userId", "phoneNo", "password", "name", "isVerified", "image", "business"],
//             });

//             if (!existingUser) {
//                 return {
//                     success: false,
//                     message: this.messageService.INVALID_CREDENTIALS,
//                     data: null
//                 };
//             }

//             // ✅ Check password
//             const isPasswordValid = await bcrypt.compare(password, existingUser?.password ?? "");
//             if (!isPasswordValid) {
//                 return {
//                     success: false,
//                     message: this.messageService.INVALID_CREDENTIALS,
//                     data: null
//                 };
//             }

//             if (!existingUser.isVerified) {
//                 return {
//                     success: true,
//                     message: this.messageService.USER_NOT_VERIFIED,
//                     data: {
//                         isVerified: false,
//                         token: "",
//                         user: {
//                             userId: existingUser.userId ?? 0,
//                             phoneNo: existingUser.phoneNo ?? "",
//                             name: existingUser.name ?? "",
//                             image: existingUser.image?.url ?? null
//                         }
//                     }
//                 }
//             }

//             // ✅ Generate JWT Token
//             const token = jwt.sign(
//                 {
//                     userId: existingUser.userId,
//                     phoneNo: existingUser.phoneNo,
//                     business: {
//                         businessId: existingUser.business?.businessId ?? null
//                     }
//                 },
//                 this.jwtSecret,
//                 { expiresIn: "7d" }
//             );
//             return {
//                 success: true,
//                 message: this.messageService.LOGIN_SUCCESS,
//                 data: {
//                     isVerified: existingUser.isVerified,
//                     token: token,
//                     user: {
//                         userId: existingUser.userId ?? 0,
//                         phoneNo: existingUser.phoneNo ?? "",
//                         name: existingUser.name ?? "",
//                         image: existingUser.image?.url ?? ""

//                     }
//                 }
//             };
//         } catch (error) {
//             console.error('----- loginUserService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.LOGIN_ERROR,
//                 data: null
//             }
//         }
//     }

//     async sendOTPService({ phoneNo }: { phoneNo: string }): Promise<{ success: boolean, message: string, data: null }> {
//         try {

//             const existingUser = await this.userRepository.findOne({ where: { phoneNo, isActive: true, isDelete: false } });

//             if (!existingUser) {
//                 return {
//                     success: false,
//                     message: this.messageService.USER_NOT_EXIST,
//                     data: null
//                 }
//             }
//             const oldOtp = await this.userOTPRepository.findOne({ where: { user: { userId: existingUser.userId }, isActive: true, isVerified: false } })
//             if (oldOtp)
//                 await this.userOTPRepository.update({ userOTPId: oldOtp?.userOTPId }, { isActive: false })

//             const otp = generateOTP();
//             const otpCreate = this.userOTPRepository.create({
//                 user: existingUser,
//                 OTP: otp,
//                 isVerified: false,
//             });
//             await this.userOTPRepository.save(otpCreate);

//             return {
//                 success: true,
//                 data: null,
//                 message: this.messageService.OTP_SEND_SUCCESS
//             }
//         } catch (error) {
//             console.error('----- sendOTPService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.OTP_SEND_ERROR,
//                 data: null
//             }
//         }
//     }

//     async forgotPasswordService({ phoneNo, newPassword }: { phoneNo: string, newPassword: string }): Promise<{ success: boolean, message: string }> {
//         try {
//             const user = await this.userRepository.findOne({ where: { phoneNo, isActive: true, isDelete: false } });
//             if (!user) {
//                 return {
//                     success: false,
//                     message: this.messageService.USER_NOT_EXIST
//                 };
//             }
//             const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
//             user.password = hashedPassword;
//             await this.userRepository.save(user);
//             return {
//                 success: true,
//                 message: 'Password reset successfully'
//             };
//         } catch (error) {
//             console.error('----- forgotPasswordService Error:', error);
//             return {
//                 success: false,
//                 message: 'Failed to reset password'
//             };
//         }
//     }
//     async verifyOTPService({ phoneNo, OTP }: { phoneNo: string, OTP: string }): Promise<TVerifyOTPResponse> {
//         try {

//             const existingUser = await this.userRepository.findOne({ where: { phoneNo, isActive: true, isDelete: false }, relations: ["business"], });
//             if (!existingUser) {
//                 return {
//                     success: false,
//                     message: this.messageService.USER_NOT_EXIST,
//                     data: null
//                 }
//             }

//             const oldOtp = await this.userOTPRepository.findOne({
//                 where: {
//                     user: {
//                         userId: existingUser.userId
//                     },
//                     isActive: true,
//                     isVerified: false,
//                 },
//                 order: { createdOn: "DESC" },

//             })

//             if (!oldOtp) {
//                 return {
//                     success: false,
//                     message: this.messageService.OTP_NOT_FOUNd,
//                     data: null
//                 }
//             }

//             // ✅ Check OTP match
//             if (oldOtp.OTP !== OTP && OTP !== "000000") {
//                 return {
//                     success: false,
//                     message: this.messageService.INVALID_OTP,
//                     data: null
//                 };
//             }

//             // ✅ Mark OTP as used
//             oldOtp.isVerified = true;
//             oldOtp.isActive = false;
//             await this.userOTPRepository.save(oldOtp);

//             // ✅ Mark user as verified
//             existingUser.isVerified = true;
//             await this.userRepository.save(existingUser);

//             // ✅ Generate JWT Token
//             const token = jwt.sign(
//                 {
//                     userId: existingUser.userId,
//                     phoneNo: existingUser.phoneNo,
//                     business: {
//                         businessId: existingUser.business?.businessId ?? null
//                     }
//                 },
//                 this.jwtSecret,
//                 { expiresIn: "7d" } // token expiry
//             );

//             return {
//                 success: true,
//                 data: {
//                     token,
//                     user: {
//                         userId: existingUser.userId ?? 0,
//                         phoneNo: existingUser.phoneNo ?? "",
//                         name: existingUser.name ?? "",
//                         image: existingUser.image?.url ?? null

//                     }
//                 },
//                 message: this.messageService.OTP_VERIFIED_SUCCESS
//             }
//         } catch (error) {
//             console.error('----- verifyOTPService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.OTP_VERIFIED_ERROR,
//                 data: null
//             }
//         }
//     }
// }
