import { LoginData } from "../models/common/login-data";
import { UserData } from "../models/common/user-data";
import { Observable } from "rxjs";
import AuthService from "./auth-service";
import { nextTick } from "process";
import { AUTH_TOKEN } from "./courses-service-rest";
const pollingInterval: number = 2000;
const nonAuthorizedUser: UserData = { username: '', isAdmin: false, displayName: '' };
export default class AuthServiceJwt implements AuthService {
    private cache = '';
    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscriber => {
            let userData: UserData = fetchUserData();
            this.cache = JSON.stringify(userData);
            subscriber.next(userData);
            setInterval(() => {
                userData = fetchUserData();
                const userDataJSON = JSON.stringify(userData);
                if (userDataJSON !== this.cache) {
                    subscriber.next(userData);
                    this.cache = userDataJSON;
                }
            }, pollingInterval)
        })
    }
    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

function fetchUserData(): UserData {
    const token: string | null = localStorage.getItem(AUTH_TOKEN);
    return !token ? nonAuthorizedUser : tokenToUserData(token);


}
function tokenToUserData(token: string): UserData {
    const rawPayload = token.split('.')[1]; // JSON in Base64 
    const payload: any = JSON.parse(Buffer.from(rawPayload, 'base64').toString());

}

