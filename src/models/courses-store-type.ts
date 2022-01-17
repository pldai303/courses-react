import { UserData } from "./common/user-data";
import Course from "./course";

type CoursesStore = {
    list: Course[],
    userData: UserData,
    add?: (course:Course) => void,
    remove?: (id:number) => void
}
export default CoursesStore;