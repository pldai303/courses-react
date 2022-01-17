import { Typography } from "@mui/material";
import  { FC } from "react";
import { authService } from "../../config/service-config";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/loginForm";
import courseData from "../../config/courseData.json"
const Login: FC = () => {

    return <LoginForm loginFn={function (loginData: LoginData): Promise<boolean> {
        return authService.login(loginData);
    } } passwordValidationFn={function (password: string): string {
        return password.length < courseData.passwordLength ?
         `length of password can't be less than ${courseData.passwordLength}` : ''
    } }></LoginForm>
}
export default Login;