
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { Subscription} from 'rxjs';
import { developmentRoutes, PATH_COURSES, PATH_LOGIN, routes } from './config/routes-config';
import { authService, college } from './config/service-config';
import Course from './models/course';
import CoursesStore from './models/courses-store-type';
import CoursesContext, { initialCourses } from './store/context';
import { RouteType } from './models/common/route-type';
import { UserData } from './models/common/user-data';
import { Typography } from '@mui/material';
import process from 'process';


function getRelevantRoutes(userData: UserData): RouteType[] {
  let resRoutes = routes;
  if (process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  return resRoutes.filter(r => (!!userData.username && r.authenticated)
   || (userData.isAdmin && r.adminOnly) || (!userData.username && !r.authenticated && !r.adminOnly))
}
const App: FC = () => {

  const [storeValueState, setStoreValue] = useState<CoursesStore>(initialCourses);
  storeValueState.add = addCourse;
  storeValueState.remove = removeCourse;

  function addCourse(course: Course): Promise<Course> {
    return college.addCourse(course);
  }

  function removeCourse(id: number): Promise<Course> {
    return college.removeCourse(id);
  }
 
  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);
  function getRoutes(): ReactNode[] {
    return relevantRoutes.map((r: RouteType) => <Route key={r.path} path={r.path} element={r.element} />)
  }
  useEffect (()=>{
    setRelevantRoutes(getRelevantRoutes((storeValueState.userData)));

  }, [storeValueState.userData]) 
  useEffect(() => {
    
      function getUserData(): Subscription {
        return authService.getUserData().subscribe({
          next(ud) {
            storeValueState.userData = ud;
            setStoreValue({ ...storeValueState })
          }
        })
  
    }
    
    const subscriptionUserData = getUserData();
    
    
    return () => subscriptionUserData.unsubscribe();
  }, [])
  useEffect(() => {
    function getData(): Subscription {
      return college.getAllCourses().subscribe({
        next(arr) {
          storeValueState.list = arr;
          setStoreValue({ ...storeValueState })
        }
      })
    }
   
    const subscription = getData();
    return () => subscription.unsubscribe();
  }, [])
  return <CoursesContext.Provider value={storeValueState}>

    <BrowserRouter>
      <NavigatorResponsive items={relevantRoutes} />
      <Routes>
        {getRoutes()}
        
      <Route path={'*'} element={<Navigate to={relevantRoutes[0].path}/>}/>
      </Routes> 
     

    </BrowserRouter>

  </CoursesContext.Provider>
}

export default App;
