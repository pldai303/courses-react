export enum CourseFieldName {
    id = 'id',
    courseName = "courseName",
    lecturerName = "lecturerName",
    hoursNum = "hoursNum",
    cost = "cost",
    type = "type",
    dayEvening = "dayEvening",
    startDate = "startDate",
    actions = "actions",
}

export type DashboardCourseSizes = {
    isDesktop:  CourseFieldName[],
    isTablet: CourseFieldName[],
    isLandscape: CourseFieldName[],
    isNotMobile: CourseFieldName[],
    isPortraitMobile: CourseFieldName[]
}

export const dashboardCourseSizes:DashboardCourseSizes = {
    isDesktop: [...Object.values(CourseFieldName)],
    isTablet: [...Object.values(CourseFieldName)],
    isNotMobile: [...Object.values(CourseFieldName)],
    isLandscape: [CourseFieldName.courseName, CourseFieldName.startDate,CourseFieldName.lecturerName, CourseFieldName.actions],
    isPortraitMobile: [CourseFieldName.courseName,CourseFieldName.startDate,  CourseFieldName.actions],

}