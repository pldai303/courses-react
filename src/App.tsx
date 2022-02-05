import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { Subscription } from 'rxjs';
import { developmentRoutes, PATH_LOGOUT, routes } from './config/routes-config';
import { authService, college } from './config/service-config';
import CoursesStore from './models/courses-store-type';
import CoursesContext, { initialCourses } from './store/context';
import { RouteType } from './models/common/route-type';
import { DISPLAY_NAME_ERROR, nonAuthorizedUser, UserData } from './models/common/user-data';
import { Alert } from '@mui/material';
import process from 'process';
import ErrorCode from './models/common/error-code';
import { AUTH_TOKEN } from './services/courses-service-rest';
import {useDispatch, useSelector} from 'react-redux'
import { userDataSelector } from './redux/store';
import { setCourses, setUserData } from './redux/actions';

function getRelevantRoutes(userData: UserData): RouteType[] {
  let resRoutes = routes;
  if (process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  const logoutRoute = resRoutes.find(r => r.path === PATH_LOGOUT);
  logoutRoute!.label = userData.displayName;
  return resRoutes.filter(r => (!!userData.username && r.authenticated)
    || (userData.isAdmin && r.adminOnly) || (!userData.username && !r.authenticated && !r.adminOnly))
}

const App: FC = () => {
const userData: UserData = useSelector(userDataSelector);
const dispatch = useDispatch();
  const [flErrorServer, setFlErrorServer] = useState<boolean>(false);
  const functionsInit = useCallback(() => {
    initialCourses.add = course => college.addCourse(course).catch(err => handleError(err));
    initialCourses.remove = id => college.removeCourse(id).catch(err => handleError(err));
    initialCourses.update = (id, newCourse) =>
      college.updateCourse(id, newCourse).catch(err => handleError(err));
  }, [])
  
  useEffect(() => {
    functionsInit();
  }, [functionsInit])


  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);
  function handleError(code: ErrorCode) {

    if (code === ErrorCode.NO_ERROR) {
    
      setFlErrorServer(false);
     

    } else if (code === ErrorCode.AUTH_ERROR) {
      if (!!userData.username) {
        authService.logout();
      }
      setFlErrorServer(false)


    } else {
      setFlErrorServer(true);
    }
  }
  function getRoutes(): ReactNode[] {
    return relevantRoutes.map((r: RouteType) => <Route key={r.path} path={r.path} element={r.element} />)
  }
  useEffect(() => {
    setRelevantRoutes(getRelevantRoutes((userData)));

  }, [userData])
  useEffect(() => {

    function getUserData(): Subscription {
     
      return authService.getUserData().subscribe({
        next(ud) {
          if (ud.displayName == DISPLAY_NAME_ERROR) {
            handleError(ErrorCode.SERVER_UNAVAILABLE)
          } else {
            handleError(ErrorCode.NO_ERROR);
           dispatch(setUserData(ud))
          }

        }
      })

    }

    const subscriptionUserData = getUserData();


    return () => subscriptionUserData.unsubscribe();
  }, [])
  useEffect(() => {
    let subscription:any;
     subscription = getData();
    function getData(): Subscription {
      
      subscription && subscription.unsubscribe();
      return college.getAllCourses().subscribe({

        next(arr) {
          handleError(ErrorCode.NO_ERROR);
          
          dispatch(setCourses(arr))
        },
        error(err) {
          handleError(err);
          setTimeout(() => { subscription = getData() }, 2000);
        }

      })
    }


    return () => subscription.unsubscribe();
  }, [])
  return <CoursesContext.Provider value={initialCourses}>
    {flErrorServer ? <Alert severity='error'>Server is unavailable</Alert> :
      <BrowserRouter>
        <NavigatorResponsive items={relevantRoutes} />

        : <Routes>
          {getRoutes()}

          <Route path={'*'} element={<Navigate to={relevantRoutes[0].path} />} />
        </Routes>


      </BrowserRouter>}

  </CoursesContext.Provider>
}

export default App;