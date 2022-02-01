import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, unavailableServiceUser, UserData } from "../models/common/user-data";
import { Observable } from "rxjs";
import AuthService from "./auth-service";
import { AUTH_TOKEN } from "./courses-service-rest";
const pollingInterval: number = 2000;

export default class AuthServiceJwt implements AuthService {
    private cache = '';
    private flUnavailability = false;
    constructor(private url: string) { }
    private fetchUserData(): UserData {
        const token: string | null = localStorage.getItem(AUTH_TOKEN);
        if (this.flUnavailability) {
           this.flUnavailability = false;
            return unavailableServiceUser;
        }
        return !token ? nonAuthorizedUser : tokenToUserData(token);


    }
    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscriber => {
            let userData: UserData = this.fetchUserData();
            this.cache = JSON.stringify(userData);
            subscriber.next(userData);
            setInterval(() => {
                userData = this.fetchUserData();
                const userDataJSON = JSON.stringify(userData);
                if (this.cache !== userDataJSON) {
                    subscriber.next(userData);
                    this.cache = userDataJSON;
                }

            }, pollingInterval)
        })
    }
    async login(loginData: LoginData): Promise<boolean> {
        let res = false;
        try {
            const response = await fetch(`${this.url}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                const token = await response.json();
                localStorage.setItem(AUTH_TOKEN, token.accessToken);
                res = true;

            }
            return res;
        } catch (err) {
            this.flUnavailability = true;
            localStorage.setItem(AUTH_TOKEN, 'xxx'); //only for activating poller after service availability
            return false;
        }

    }
    logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN);
        return Promise.resolve(true);
    }

}


function tokenToUserData(token: string): UserData {
    let resUserData = nonAuthorizedUser;
    const rawPayload = token.split('.')[1]; // JSON in Base64 
    //Fixme
    //Buffer.from(rawPayload, 'base64').toString("ascii")
    const payload: any = JSON.parse(atob(rawPayload));
    if (payload.exp < (Date.now() / 1000)) {
        localStorage.removeItem(AUTH_TOKEN);
    } else {
        resUserData = {
            username: payload.email,
            displayName: payload.email, isAdmin: +payload.sub === 1
        }
    }
    return resUserData;

}

