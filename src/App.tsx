
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NavigatorWeb from './components/common/navigator-web';

import { PATH_COURSES, routes } from './config/routes-config';


const theme = createTheme();
theme.typography.body1 = {
  fontSize: '1.2rem',
  '@media (min-width:568px)': {
    fontSize: '2rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem'
  }
}
const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)
  }
  return <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavigatorWeb items={routes}/>
      <Routes>
        {getRoutes()}
        <Route path='/' element={<Navigate to={PATH_COURSES}></Navigate>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
}

export default App;
