export type UserData = {
    username: string;
    isAdmin: boolean;
    displayName: string;
}
export const nonAuthorizedUser: UserData = { username: '', isAdmin: false, displayName: '' };