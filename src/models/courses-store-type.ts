import { UserData } from "./common/user-data";
import Course from "./course";

type CoursesStore = {
    list: Course[],
    userData: UserData,
    add: (course:Course) => Promise<Course>,
    remove: (id:number) => Promise<Course>,
    update: (id: number, course: Course) => Promise<Course>
}
export default CoursesStore;