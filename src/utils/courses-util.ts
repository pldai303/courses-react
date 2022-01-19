import Course from "../models/course";

export function getEmptyCourse(): Course {
    const course: Course = {
        id: 0,
        courseName: "",
        lecturerName: "",
        hoursNum: 0,
        cost: 0,
        type: "",
        dayEvening: [],
        startDate: new Date(), //FIXMI change to min possible date
    }
    return course;
}