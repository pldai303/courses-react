import CoursesService from "./courses-service";
import firebase, {collection, doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';
import appFire from "../config/fire-config";
import { Observable } from "rxjs";
import {collectionData} from "rxfire/firestore";
import Course from '../models/course';
import { getRandomInteger } from "../utils/common/random";
export default class CoursesServiceFirestore implements CoursesService {
    db: firebase.Firestore;
    fireCollection: firebase.CollectionReference;
    constructor(private collectionName: string, private minId: number, private maxId: number) {
        this.db = firebase.getFirestore(appFire);
        this.fireCollection = collection(this.db, collectionName);
    }
    
    async add(course: Course): Promise<Course> {
        const id = await this.getRandomId();
        course = {...course, id};
        await setDoc(doc(this.fireCollection, id.toString()), course );
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
        const docRef = doc(this.db, this.collectionName, id.toString()); 
        await deleteDoc(docRef);
        return course as Course;


    }
    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.db, this.collectionName, id.toString()); 
        const docSnap = await getDoc(docRef); 
        return docSnap.exists();
    }
     get(id?: number): Promise<Course> | Observable<Course[]> {
        if (id !== undefined) {
            const docRef = doc(this.db, this.collectionName, id.toString())
        return getDoc(docRef).then(docSnap => docSnap.data() as Course) ;
        
        }
        
        return collectionData(this.fireCollection) as Observable<Course[]>;
    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const course = await this.get(id);
         await setDoc(doc(this.fireCollection, id.toString()), newCourse);
         return course as Course;

    }
    
}


