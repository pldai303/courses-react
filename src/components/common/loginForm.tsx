import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { FC, useState, useEffect, ReactNode } from 'react'
import { LoginData } from '../../models/common/login-data';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NetworkIcon from '../../models/common/network-icon';

type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    passwordValidationFn: (password: string) => string;
    networks?: NetworkIcon[]
}
const emptyLoginData: LoginData = { email: "", password: "" }

const LoginForm: FC<LoginFormProps> = (props) => {
    const theme = createTheme();


    const { loginFn, passwordValidationFn, networks } = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [flValid, setflValid] = useState<boolean>(false);

    useEffect(() => {
        setflValid(!!loginData.email && !passwordValidationFn(loginData.password));
    }, [loginData]);

    async function onSubmit(event: any) {
        event.preventDefault();
        const res: boolean = await loginFn(loginData);
        if (!res) {
            alert("Wrong credentials or auth service is unavailable");
        } else {
            alert("Login Successed")
        }
    }

    function usernameHandler(event: any) {
        loginData.email = event.target.value;
        setLoginData({ ...loginData });
    }

    function passwordHandler(event: any) {
        const password = event.target.value;
        const message = passwordValidationFn(password);
        setErrorMessage(message);
        loginData.password = password;
        setLoginData({ ...loginData });
    }
    function getNetworkIcons(): ReactNode {
      if (networks) {
          return networks.map(nw => <IconButton key={nw.name}
             onClick={() =>
              loginFn({ email: nw.name, password: '' })}
               >

              <Avatar src={nw.iconUrl} sx={{width:{xs: '6vh', sm: '6vw', lg: '3vw'}}}  />
          </IconButton>)
      }
  }


       return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={usernameHandler}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={passwordHandler}
                error={!!errorMessage}
                helperText={errorMessage}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                disabled={!flValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>            
            </Box>
           { (networks && networks.length != 0) && <Box>
             or with networks <br/>  
              {getNetworkIcons()}
            </Box>}
          </Box>
        </Container>
        </ThemeProvider>
       )
}

export default LoginForm