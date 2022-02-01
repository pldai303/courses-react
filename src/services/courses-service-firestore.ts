import CoursesService from "./courses-service";
import { collection, CollectionReference, deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import appFire from "../config/fire-config";
import { map, Observable } from "rxjs";
import {collectionData} from "rxfire/firestore";
import Course from '../models/course';
import { getRandomInteger } from "../utils/common/random";
export default class CoursesServiceFirestore implements CoursesService {

    fireCollection: CollectionReference;

    constructor(collectionName: string, private minId: number, private maxId: number) {
        const db = getFirestore(appFire);
        this.fireCollection = collection(db, collectionName);
        if (minId > maxId) {
            [this.minId, this.maxId] = [maxId, minId];
        }
    }

    async add(course: Course): Promise<Course> {
        const id = await this.getId();
        course.id = id;
        course = this.fixDateCourse(course);
        await setDoc(doc(this.fireCollection, id.toString()), course);
        return course;
    }

    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id);
        await deleteDoc(this.getDocRef(id));
        return oldCourse as Course;
    }

    async exists(id: number): Promise<boolean> {
        const docSnap = await getDoc(this.getDocRef(id));
        return docSnap.exists();
    }

    get(id?: number): Promise<Course> | Observable<Course[]> {
        if (id !== undefined) {
            return getDoc(this.getDocRef(id))
            .then(docSnap => docSnap.data() as Course);
        }
        return collectionData(this.fireCollection) as Observable<Course[]>;
    }

    async update(id: number, newCourse: Course): Promise<Course> {
        
        const oldCourse = await this.get(id);
        await setDoc(this.getDocRef(id), this.fixDateCourse(newCourse));
        return oldCourse as Course;
    }

    pull(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    private async getId(): Promise<number> {
        let id;
        do {
            id = getRandomInteger(this.minId, this.maxId);
        } while (await this.exists(id));
        return id;
    }

    private getDocRef(id: number) {
        return doc(this.fireCollection, id.toString());
    }

    private fixDateCourse(course: any): Course {
        course.openDate = course.openDate.toISOString();
        return course;
    }

}




