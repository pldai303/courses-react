
import React, { useContext } from "react";



import AddCourseForm from "../add-course-form";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourseAction } from "../../redux/actions";

const AddCourse: React.FC = () => {
    //хук useContext() позволяет делать рендеринг компоненты по изменению глобального ресурсы
    const dispatch = useDispatch();
    const { courseNames, lecturers, types, timing } = courseData;
    return (
        <AddCourseForm 
            addCourseFn={(course) => dispatch(addCourseAction(course)) }
            courseConfig={{
                courseNames,
                lecturers,
                types,
                timing,
            }} validateHoursFn={function (hours: number): string {
                if(hours >= courseData.minHours && hours <= courseData.maxHours) {
                    return "";
                } else {
                    return `Course duration must be within ${courseData.minHours} - ${courseData.maxHours}`
                }
            } } validateCostFn={function (cost: number): string {
                if(cost >= courseData.minCost && cost <= courseData.maxCost) {
                    return "";
                } else {
                    return `Course cost must be within ${courseData.minCost} - ${courseData.maxCost}`
                }
            } } validateDateFn={function (date: Date): string {
                const year = date.getFullYear();
                if(year >= courseData.minYear && year <= courseData.maxYear) {
                    return "";
                } else {
                    return `Incorrect open date, need a date in the range ${courseData.minYear} - ${courseData.maxYear}. `
                }
            } } validateDayEveningFn={function (dayEvening: string[]): string {
                if(dayEvening.length > 0) {
                    return "";
                } else {
                    return `Incorrect timing, please select options from the suggested ones. `
                }
            } } />
    )
    
    
    
}

export default AddCourse;