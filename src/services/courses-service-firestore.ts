import CoursesService from "./courses-service";
import {collection, doc, getDoc, setDoc, deleteDoc, getFirestore, CollectionReference} from 'firebase/firestore';
import firebase from 'firebase/firestore'
import appFire from "../config/fire-config";
import { Observable } from "rxjs";
import {collectionData} from "rxfire/firestore";
import Course from '../models/course';
import { getRandomInteger } from "../utils/common/random";
import {catchError} from 'rxjs/operators'
import ErrorCode from "../models/common/error-code";
export default class CoursesServiceFirestore implements CoursesService {
    
    fireCollection: CollectionReference;
    constructor( collectionName: string, private minId: number, private maxId: number) {
       
        this.fireCollection = collection(getFirestore(appFire), collectionName);
    }
    
    async add(course: Course): Promise<Course> {
        const id = await this.getRandomId();
        course = {...course, id};
        await this.setCourse(id, course);
        return course;

    }
     private async getRandomId(): Promise<number> {
        let res: number;
        do {
            res = getRandomInteger(this.minId, this.maxId);
        } while(await this.exists(res) )
        return res;
    }
   async remove(id: number): Promise<Course> {
        const course = await this.get(id);
        const docRef = doc(this.fireCollection, id.toString()); 
        await deleteDoc(docRef);
        return course as Course;


    }
    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.fireCollection, id.toString()); 
        const docSnap = await getDoc(docRef); 
        return docSnap.exists();
    }
     get(id?: number): Promise<Course> | Observable<Course[]> {
        if (id !== undefined) {
            const docRef = doc(this.fireCollection, id.toString())
        return getDoc(docRef).then(docSnap => docSnap.data() as Course) ;
        
        }
        
        return collectionData(this.fireCollection) as Observable<Course[]>;
        
    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const course = await this.get(id);
         await this.setCourse(id, newCourse);
         return course as Course;

    }
    

    private async setCourse(id: number, newCourse: Course) {
        await setDoc(doc(this.fireCollection, id.toString()), convertCourse(newCourse));
    }

}
function convertCourse(course: Course): any {
    return {...course, startDate: course.startDate.toISOString()}
}


