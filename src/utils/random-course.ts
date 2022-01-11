import Course, { createCourse } from "../models/course";
import courseData from "../config/courseData.json"
import { getRandomDate, getRandomElement, getRandomInteger } from "./common/random";
export function createRandomCourses(count: number): Course[] {
    const result: Course[] = [];
    for (let i = 0; i < count; i++) {
        let course = getRandomCourse();
        result.push(course);
    }
    return result;
}

export function getRandomCourse() {
    let id = getRandomInteger(courseData.minId, courseData.maxId);
    let courseName = getRandomElement(courseData.courseNames);
    let lecturerName = getRandomElement(courseData.lecturers);
    let hours = getRandomInteger(courseData.minHours, courseData.maxHours);
    let cost = getRandomInteger(courseData.minCost, courseData.maxCost);
    let type = getRandomElement(courseData.types);
    let timingInd = getRandomInteger(0, courseData.timing.length);
    let timing = timingInd < courseData.timing.length ?
        [courseData.timing[timingInd]] : courseData.timing;
    let startDate = getRandomDate(courseData.minYear, courseData.maxYear);
    let course = createCourse(id, courseName, lecturerName, hours, cost, type, timing, startDate);
    return course;
}
