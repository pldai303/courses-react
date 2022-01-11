
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';

import { PATH_COURSES, routes } from './config/routes-config';
import Course from './models/course';
import CoursesStore from './models/courses-store-type';
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
  storeValueState.add = addCourse;
  storeValueState.remove = removeCourse;

  function addCourse(course: Course) {
    storeValueState.list.push(course);
    setStoreValue({ ...storeValueState });
  }

  function removeCourse(id: number) {
    const index = storeValueState.list.findIndex(e => e.id === id);
    if (index >= 0) storeValueState.list.splice(index, 1);
    setStoreValue({ ...storeValueState });
  }
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)
  }
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
