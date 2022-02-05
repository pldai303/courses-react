
import courseData from "./courseData.json";
import College from "../services/college";
import CoursesServiceFirestore from "../services/courses-service-firestore";
import AuthServiceFire from "../services/auth-service-fire";
import AuthServiceFake from "../services/auth-service-fake";
import { FACEBOOK, GOOGLE, TWITTER } from "./networks-config";
import NetworkIcon from "../models/common/network-icon";
export const serviceSupportedNetworks: NetworkIcon[] = [
    {name: FACEBOOK, iconUrl: "/facebook.png"},
    {name: GOOGLE, iconUrl: "/google.png"},
    {name: TWITTER, iconUrl: "/twitter.png"},
    

];



const courseProvider = new CoursesServiceFirestore("courses", courseData.minId , courseData.maxId);
export const college = new College(courseProvider);
export const authService = new AuthServiceFire("administrators");