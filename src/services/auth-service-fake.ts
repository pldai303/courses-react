import { Observable, of } from "rxjs";
import { LoginData } from "../models/common/login-data";
import { UserData } from "../models/common/user-data";
import AuthService from "./auth-service";
export default class AuthServiceFake implements AuthService {
    getUserData(): Observable<UserData> {
        return of({username: 'admin-courses@email.com', isAdmin: true, displayName: 'admin-courses@email.com'});
    }
    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<boolean> {
        return Promise.resolve(true);
    }
    
}