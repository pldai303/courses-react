import courseData from '../../config/courseData.json'
import { FC, useContext, useEffect, useState } from "react";
import CoursesContext from "../../store/context";
import Statistics from "../common/statistics"; 




export const StatisticsHours: FC = () => {
  const storeValue = useContext(CoursesContext);
  
return <Statistics intervals={courseData.hoursDivider} field={"hoursNum"}
 data={storeValue.list} unit='h' inputLabelName='Hours Interval'></Statistics>
 
}
export default StatisticsHours