import _ from "lodash";
import  { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import Statistics from "../common/statistics";
import courseData from '../../config/courseData.json'
import { useSelector } from "react-redux";
import Course from "../../models/course";
import { coursesSelector } from "../../redux/store";




export const StatisticsCost: FC = () => {
  const courses: Course[] = useSelector(coursesSelector)
  
    return <Statistics intervals={courseData.costDivider} field={"cost"}
    data={courses} unit='ILS' inputLabelName='Cost Interval'></Statistics>
    
   }
export default StatisticsCost