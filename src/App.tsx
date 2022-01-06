import { FC, ReactNode } from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import { routes } from './config/routes-config';



const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element}/>)
  }
  return <BrowserRouter>

    <Routes>
     {getRoutes()}
    </Routes>
  </BrowserRouter>
}

export default App;
