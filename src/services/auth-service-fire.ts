import AuthService from "./auth-service";
//same as getFireStore
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'; 
//every service has its own import from rxfire 
import {authState} from 'rxfire/auth';
import { collectionData } from "rxfire/firestore";

import { Observable } from "rxjs";
import {map, mergeMap} from 'rxjs/operators';
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import appFire from "../config/fire-config";

import { docData } from "rxfire/firestore"; //direct access to collection

export default class AuthServiceFire implements AuthService{
    

    private authFire = getAuth(appFire);

    // constructor(private collectionAdministartors : string) {
        
    // }
    //merge two observable for one subscribe (define if user is admin or not)
    //Use operator mergemap insted of map    
    //replace observable 1. this user is auth
    //second observable 2. check if this user is admin
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(map(user => (
            !!user ? {username: user.uid, isAdmin: true, 
                displayName: user.displayName || user.email!} : nonAuthorizedUser
        )))
    }
    
    login(loginData: LoginData): Promise<boolean> {
        return signInWithEmailAndPassword(this.authFire, loginData.email, loginData.password)
        .then(()=>true).catch(()=>false);
    }
    logout(): Promise<boolean> {
        return signOut(this.authFire).then(()=>true).catch(()=>false);
    }
    
}