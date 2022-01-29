import Course from "../models/course";
import CoursesService from "./courses-service";
import { Observable, from } from "rxjs"
import ErrorCode from "../models/common/error-code";
const pollingInterval = 1000;
export const AUTH_TOKEN = "auth_token";

async function  getResponse(url: string, init?: RequestInit  ): Promise<Response>  {
    let flInnerCatch = false;
     try {
         const response = await fetch(url, init);
         if (response.status < 400 || response.status == 404) {
             return response ;
         }
         const err = response.status == 401 || response.status == 403 ?
         ErrorCode.AUTH_ERROR : ErrorCode.SERVER_UNAVAILABLE;
         flInnerCatch = true
         throw err;
     } catch (err) {
         if (flInnerCatch) {
             throw err;
         } else {
             throw ErrorCode.SERVER_UNAVAILABLE;
         }
     }
}
async function requestRest(url: string, init?: RequestInit): Promise<any> {
    const response: Response = await getResponse(url, init) ;
    return await response.json();
}
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
     add(course: Course): Promise<Course> {
        (course as any).userId = 1;
        return requestRest(this.url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
       
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await requestRest(this.getUrlId(id),{
            method: "DELETE",
            headers: getHeaders()
        });
        return oldCourse as Course;
    }
    private getUrlId(id: number) {
        return `${this.url}/${id}`;
    }
    async exists(id: number): Promise<boolean> {
        const response = await getResponse(this.getUrlId(id),{
            headers: getHeaders(),
        } );
        return response.ok;
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
                        }).catch(err => {
                            
                            this.cache.setCache([]);
                            observer.error(err)
                        });
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
 function fetchGet(url: string): Promise<any> {
        return  requestRest(url, {
            headers: getHeaders()
        }); 
    
}