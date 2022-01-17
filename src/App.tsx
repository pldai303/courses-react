
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { Subscription} from 'rxjs';
import { PATH_COURSES, routes } from './config/routes-config';
import { authService, college } from './config/service-config';
import Course from './models/course';
import CoursesStore from './models/courses-store-type';
import CoursesContext, { initialCourses } from './store/context';



const App: FC = () => {

  const [storeValueState, setStoreValue] = useState<CoursesStore>(initialCourses);
  

  function addCourse(course: Course) {
    college.addCourse(course).then();
  }

  function removeCourse(id: number) {
    college.removeCourse(id).then();
  }
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)
  }
  useEffect(() => {
    function getData(): Subscription {
      return college.getAllCourses().subscribe({
        next(arr) {
          storeValueState.list = arr;
          setStoreValue({ ...storeValueState })
        }
      })
    }
      function getUserData(): Subscription {
        return authService.getUserData().subscribe({
          next(ud) {
            storeValueState.userData = ud;
            setStoreValue({ ...storeValueState })
          }
        })
  
    }
    storeValueState.add = addCourse;
    storeValueState.remove = removeCourse;
    const subscriptionUserData = getUserData();
    const subscription = getData();
    
    return () => subscription.unsubscribe();
  }, [])
  return <CoursesContext.Provider value={storeValueState}>

    <BrowserRouter>
      <NavigatorResponsive items={routes} />
      <Routes>
        {getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES}></Navigate>} />
      </Routes>
    </BrowserRouter>

  </CoursesContext.Provider>
}

export default App;
