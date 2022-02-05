import { createContext } from "react";
import { nonAuthorizedUser } from "../models/common/user-data";
import CoursesStore from "../models/courses-store-type";
import {college} from "../config/service-config";


 
export const initialCourses: CoursesStore = { };
const CoursesContext = createContext<CoursesStore>(initialCourses);
export default CoursesContext;