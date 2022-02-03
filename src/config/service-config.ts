
//import AuthServiceFake from "../services/auth-service-fake";
import AuthServiceFire from "../services/auth-service-fire";
//import AuthServiceJwt from "../services/auth-service-jwt";
import College from "../services/college";
import CoursesServiceFirestore from "../services/courses-service-firestore";
//import CoursesServiceRest from "../services/courses-service-rest";
import courseData from './courseData.json';

//const URL = "http://localhost:3500/courses"
//const courseProvider = new CoursesServiceRest(URL);
const courseProvider = new CoursesServiceFirestore("courses", courseData.minId, courseData.maxId);
export const college = new College(courseProvider);
//export const authService = new AuthServiceJwt("http://localhost:3500");
//export const authService = new AuthServiceFake();
export const authService = new AuthServiceFire("administartors");