
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { Subscription} from 'rxjs';
import { PATH_COURSES, routes } from './config/routes-config';
import { authService, college } from './config/service-config';
import Course from './models/course';
import CoursesStore from './models/courses-store-type';
import CoursesContext, { initialCourses } from './store/context';
import { RouteType } from './models/common/route-type';
import { UserData } from './models/common/user-data';


function getRelevantRoutes(userData: UserData): RouteType[] {
  return routes.filter(r => (!!userData.username && r.authenticated)
   || (userData.isAdmin && r.adminOnly) || (!userData.username && !r.authenticated && !r.adminOnly))
}
const App: FC = () => {

  const [storeValueState, setStoreValue] = useState<CoursesStore>(initialCourses);
  

  function addCourse(course: Course) {
    college.addCourse(course).then();
  }

  function removeCourse(id: number) {
    college.removeCourse(id).then();
  }
  function getRoutes(): ReactNode[] {
    return getRelevantRoutes(storeValueState.userData).map(r => <Route key={r.path} path={r.path} element={r.element} />)
  }
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
    storeValueState.add = addCourse;
    storeValueState.remove = removeCourse;
    const subscription = getData();
    return () => subscription.unsubscribe();
  }, [])
  return <CoursesContext.Provider value={storeValueState}>

    <BrowserRouter>
      <NavigatorResponsive items={getRelevantRoutes(storeValueState.userData)} />
      <Routes>
        {getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES}></Navigate>} />
      </Routes>
    </BrowserRouter>

  </CoursesContext.Provider>
}

export default App;
