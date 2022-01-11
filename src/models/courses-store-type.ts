import Course from "./course";

type CoursesStore = {
    list: Course[],
    add?: (course:Course) => void,
    remove?: (id:number) => void
}
export default CoursesStore;