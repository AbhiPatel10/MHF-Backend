import jwt from 'jsonwebtoken';

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

export const generateJWTToken = ({ userId, phoneNo, businessId }: { userId: number, phoneNo: string, businessId: number }) => {
    const jwtSecret = process.env.JWT_SECRET ?? "";
    const token = jwt.sign(
        {
            userId: userId,
            phoneNo: phoneNo,
            business: {
                businessId: businessId ?? null
            }
        },
        jwtSecret,
        { expiresIn: "7d" }
    );

    return token;
}