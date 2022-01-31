
import AuthServiceFake from "../services/auth-service-fake";
import courseData from "./courseData.json";
import College from "../services/college";
import CoursesServiceFirestore from "../services/courses-service-firestore";




const courseProvider = new CoursesServiceFirestore("courses", courseData.minId , courseData.maxId);
export const college = new College(courseProvider);
export const authService = new AuthServiceFake();