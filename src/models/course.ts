type Course = {
    id: number,
    courseName: string,
    lecturerName: string,
    hoursNum: number,
    cost: number,
    type: string,
    dayEvening: string[],
    startDate: Date
};
export function createCourse(id: number, courseName: string, lecturerName: string, hoursNum: number, cost: number, type: string, dayEvening: string[], startDate: Date) {
    return { id, courseName, lecturerName, hoursNum, cost, type, dayEvening, startDate };
}
export default Course;