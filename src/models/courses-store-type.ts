import { LoginData } from "./common/login-data";
import { UserData } from "./common/user-data";
import Course from "./course";

type CoursesStore = {
    list: Course[],
    userData: UserData,
    add?: (course:Course) => Promise<Course | void> ,
    remove?: (id:number) => Promise<Course | void>,
    update?: (id: number, course: Course) => Promise<Course | void>
    
}
export default CoursesStore;