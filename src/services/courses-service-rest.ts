import Course from "../models/course";
import CoursesService from "./courses-service";

export default class CoursesServiceRest implements CoursesService {
    constructor(private url: string) { }
    async add(course: Course): Promise<Course> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        })
        return await response.json();
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: 'DELETE'
        });
        return oldCourse as Course;
    }
    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }
    async exists(id: number): Promise<boolean> {
        const responce = await fetch(this.getUrlId(id));
        return responce.ok;
    }
    get(id?: number): Promise<Course[]> | Promise<Course> {
        return id == undefined ? fetchGet(this.url) as Promise<Course[]> :
            fetchGet(this.getUrlId(id)) as Promise<Course>;

    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }
}
async function fetchGet(url: string): Promise<any> {
    const response = await fetch(url);
    return await response.json();
}