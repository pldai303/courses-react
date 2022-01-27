
import { FC, ReactNode,  useEffect,  useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import { Subscription} from 'rxjs';
import { developmentRoutes,  routes } from './config/routes-config';
import { authService, college } from './config/service-config';
import CoursesStore from './models/courses-store-type';
import CoursesContext, { initialCourses } from './store/context';
import { RouteType } from './models/common/route-type';
import { UserData } from './models/common/user-data';
import { Alert } from '@mui/material';
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
  const [flErrorServer, setFlErrorServer] = useState<boolean>(false);

  
 
  const [relevantRoutes, setRelevantRoutes] = useState<RouteType[]>(routes);
  function getRoutes(): ReactNode[] {
    return relevantRoutes.map((r: RouteType) => <Route key={r.path} path={r.path} element={r.element} />)
  }
  useEffect (()=>{
    setRelevantRoutes(getRelevantRoutes((storeValueState.userData)));

  }, [storeValueState.userData]) 
  useEffect(() => {
    console.log("useEffect....");

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
    let subscription = getData();
    function getData(): Subscription {
      return college.getAllCourses().subscribe({
       
        next(arr) {
          setFlErrorServer(false);
          //make sure no Alert of service unavailability
          storeValueState.list = arr;
          setStoreValue({ ...storeValueState })
        },
        error(err) {
          setFlErrorServer(true);
           setTimeout(() => {subscription = getData()}, 2000);
        }

      })
    }
   
   
    return () => subscription.unsubscribe();
  }, [])
  return <CoursesContext.Provider value={storeValueState}>

    <BrowserRouter>
      <NavigatorResponsive items={relevantRoutes} />
     
      {flErrorServer ? <Alert severity='error'>Server is unavailable</Alert> : <Routes>
        {getRoutes()}
        
      <Route path={'*'} element={<Navigate to={relevantRoutes[0].path}/>}/>
      </Routes> }
     

    </BrowserRouter>

  </CoursesContext.Provider>
}

export default App;
