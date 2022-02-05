import courseData from '../../config/courseData.json'
import { FC, useContext, useEffect, useState } from "react";
import CoursesContext from "../../store/context";
import Statistics from "../common/statistics"; 
import { useSelector } from 'react-redux';
import Course from '../../models/course';
import { coursesSelector, store } from '../../redux/store';




export const StatisticsHours: FC = () => {
  const courses: Course[] = useSelector(coursesSelector);
  
return <Statistics intervals={courseData.hoursDivider} field={"hoursNum"}
 data={courses} unit='h' inputLabelName='Hours Interval'></Statistics>
 
}
export default StatisticsHours