export type TUser = {}

export type TUserResponse = {
    user: TUser
}

export type TLoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: TUser;
}