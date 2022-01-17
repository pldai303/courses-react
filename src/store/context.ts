import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import CoursesStore from "../models/courses-store-type";

export const initialCourses: CoursesStore = { list: [],
userData: nonAuthorizedUser};
const CoursesContext = createContext<CoursesStore>(initialCourses);
export default CoursesContext;