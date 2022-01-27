import Course from "../models/course";
import CoursesService from "./courses-service";
import { Observable, from } from "rxjs"
const pollingInterval = 1000;
export const AUTH_TOKEN = "auth_token";
class CoursesCache {
    private cacheString: string = '';

    setCache(courses: Course[]): void {
        this.cacheString = JSON.stringify(courses);
    }

    isEquals(other: Course[]): boolean {
        return JSON.stringify(other) === this.cacheString;
    }
}
function getHeaders(): { Authorization: string, "Content-Type": string } {
    return { Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN), "Content-Type": "application/json" };
}
export default class CoursesServiceRest implements CoursesService {
    cache: CoursesCache = new CoursesCache();
    constructor(private url: string) { }
    async add(course: Course): Promise<Course> {
        (course as any).userId = 1;
        const response = await fetch(this.url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
        return await response.json();
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            headers: getHeaders(),
            method: 'DELETE'
        });
        return oldCourse as Course;
    }
    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }
    async exists(id: number): Promise<boolean> {
        const responce = await fetch(this.getUrlId(id), {
            headers: getHeaders(),
        });
        return responce.ok;
    }
    get(id?: number): Observable<Course[]> | Promise<Course> {
        if (id) {
            return fetchGet(this.getUrlId(id));
        } else {
            return new Observable<Course[]>(observer => {
                const interval = setInterval(() => {
                 
                        if (!!localStorage.getItem(AUTH_TOKEN)) {
                            fetchGet(this.url).then(courses => {
                            if (!this.cache.isEquals(courses)) {
                                this.cache.setCache(courses);
                                observer.next(courses);
                            }
                        }).catch(err => {this.cache.setCache([]);observer.error(err)});
                        }
                        

                   
                }, pollingInterval);

                return () => {console.log('clearing'); clearInterval(interval)};
            });
        }

    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }
}
async function fetchGet(url: string): Promise<any> {
    const response = await fetch(url, {
        headers: getHeaders()
    });
    return await response.json();
}