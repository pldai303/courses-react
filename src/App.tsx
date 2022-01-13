
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';

import { PATH_COURSES, routes } from './config/routes-config';
import { college } from './config/service-config';
import Course from './models/course';
import CoursesStore from './models/courses-store-type';
import College from './services/college';
import CoursesContext, { initialCourses } from './store/context';


const theme = createTheme();
// theme.typography.body1 = {
//   fontSize: '1.2rem',
//   '@media (min-width:568px)': {
//     fontSize: '2rem'
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem'
//   }
// }
const App: FC = () => {

  const [storeValueState, setStoreValue] = useState<CoursesStore>(initialCourses);
  function poller() {
    college.getAllCourses().then(arr => {
      storeValueState.list = arr;
      setStoreValue({ ...storeValueState })
    })
  }
  function addCourse(course: Course) {
    college.addCourse(course).then(() => poller());
  }

  function removeCourse(id: number) {
    college.removeCourse(id).then(() => poller());
  }
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)
  }
  useEffect(() => {

    storeValueState.add = addCourse;
    storeValueState.remove = removeCourse;
    poller();
    let update = setInterval(poller, 2000);
    return () => clearInterval(update);
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
