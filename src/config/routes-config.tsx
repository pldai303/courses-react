import { ReactNode } from "react";
import AddCourse from "../components/pages/add-course";
import Courses from "../components/pages/courses";
import Generation from "../components/pages/development/generation";
import Login from "../components/pages/login";
import Logout from "../components/pages/logout";
import StatisticsCost from "../components/pages/statistics-cost";
import StatisticsHours from "../components/pages/statistics-hours";
import { RouteType } from "../models/common/route-type";
export const PATH_COURSES = "/courses" ;
export const PATH_LOGIN = "/login";
export const PATH_LOGOUT = "/logout";
export const PATH_ADD_COURSE = "/courses/add";
export const PATH_STATISTICS_HOURS = "/courses/statistics/hours";
export const PATH_STATISTICS_COST = "/courses/statistics/cost";

export const routes: RouteType[] = [
    {path:PATH_COURSES, element: <Courses/>, label: 'Courses', authenticated: true},
    {path: PATH_ADD_COURSE, element: <AddCourse/>, label: 'Add New Course', adminOnly: true},
    
    {path: PATH_STATISTICS_COST, element: <StatisticsCost/>, label: 'Cost Statistics', authenticated: true},
    {path: PATH_STATISTICS_HOURS, element: <StatisticsHours/>, label: 'Hours Statistics', authenticated: true},
    {path: PATH_LOGIN, element: <Login/>, label: 'Sign In>'},
    {path: PATH_LOGOUT, element: <Logout/>, label: 'Sign out', authenticated: true},
    
]
export const developmentRoutes: RouteType[] = [
    {path: '/courses/development/generation', element: <Generation/>,
     label: 'Courses Generation', adminOnly: true}
]

