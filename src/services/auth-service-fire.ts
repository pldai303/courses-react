import AuthService from "./auth-service";
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {authState} from 'rxfire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import appFire from "../config/fire-config";
export default class AuthServiceFire implements AuthService {
    private authFire = getAuth(appFire);
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(map(user => (
            !!user ? {username: user.uid, isAdmin: true,
                 displayName: user.displayName || user.email!} : nonAuthorizedUser
        )));
    }
    login(loginData: LoginData): Promise<boolean> {
        return signInWithEmailAndPassword(this.authFire, loginData.email, loginData.password)
        .then(()=>true).catch(()=>false);
    }
    logout(): Promise<boolean> {
        return signOut(this.authFire).then(()=>true).catch(()=>false);
    }
    
}