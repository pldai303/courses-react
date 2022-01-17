
import AuthServiceJwt from "../services/auth-service-jwt";
import College from "../services/college";
import CoursesServiceRest from "../services/courses-service-rest";


const URL = "http://localhost:3500/courses"
const courseProvider = new CoursesServiceRest(URL);
export const college = new College(courseProvider);
export const authService = new AuthServiceJwt("http://localhost:3500");