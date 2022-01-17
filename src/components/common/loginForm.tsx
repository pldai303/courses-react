
import { Button, TextField } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { LoginData } from '../../models/common/login-data';
type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    passwordValidationFn: (password: string) => string;
}
const emptyLoginData: LoginData = { email: '', password: '' };
const LoginForm: FC<LoginFormProps> = props => {
    const { loginFn, passwordValidationFn } = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [flValid, setValid] = useState<boolean>(false);
    useEffect(() => {
        setValid(!!loginData.email && !passwordValidationFn(loginData.password));
    }, [loginData])
    async function onSubmit(event: any) {
        event.preventDefault();
        const res: boolean = await loginFn(loginData);
        if (!res) {
            alert("Wrong credentials")
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


    return <form onSubmit={onSubmit}>
        <TextField placeholder="Username/Email" required onChange={usernameHandler} />
        <TextField placeholder="Password" type="password" error={!!errorMessage}
            onChange={passwordHandler} helperText={errorMessage} required />
        <Button type="submit" disabled={!flValid}>Submit</Button>
        <Button type="reset">Reset</Button>

    </form>
}
export default LoginForm;
