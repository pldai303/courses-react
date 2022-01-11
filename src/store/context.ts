import { createContext } from "react";
import CoursesStore from "../models/courses-store-type";
import { createRandomCourses } from "../utils/random-course";

export const initialCourses: CoursesStore = { list: createRandomCourses(10) };
const CoursesContext = createContext<CoursesStore>(initialCourses);
export default CoursesContext;