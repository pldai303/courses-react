import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import CoursesStore from "../models/courses-store-type";
import {college} from "../config/service-config";


 
export const initialCourses: CoursesStore = { list: [],
userData: nonAuthorizedUser, add: course => college.addCourse(course),
 remove: id => college.removeCourse(id), update: (id, course) => college.updateCourse(id, course)};
const CoursesContext = createContext<CoursesStore>(initialCourses);
export default CoursesContext;