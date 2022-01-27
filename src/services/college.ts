import Course from "../models/course";
import CoursesService from "./courses-service";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';


export default class College {
    constructor(private coursesService: CoursesService) { }

    addCourse(course: Course): Promise<Course> {
        return this.coursesService.add(course);
    }
    removeCourse(id: number): Promise<Course> {
        return this.coursesService.remove(id);
    }
    updateCourse(id: number, newCourse: Course): Promise<Course> {
        return this.coursesService.update(id, newCourse);
    }
    getAllCourses(): Observable<Course[]> {
        return (this.coursesService.get() as Observable<Course[]>)
        .pipe(map(courses=>courses.map(course => ({...course, startDate: new Date(course.startDate)}))));
    }
    getCourse(id: number): Promise<Course> {
        return this.coursesService.get(id) as Promise<Course>;
    }

}