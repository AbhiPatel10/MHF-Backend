export interface TLoginResponse {
    success: boolean,
    message: string,
    data: {
        isVerified?: boolean,
        token: string,
        user:
        {
            userId: number,
            name: string,
            phoneNo: string,
            image: string | null
        }
    } | null
}

export interface TVerifyOTPResponse {
    success: boolean,
    message: string,
    data: {
        isVerified?: boolean,
        token: string,
        user:
        {
            userId: number,
            name: string,
            phoneNo: string,
            image: string | null
        }
    } | null
}