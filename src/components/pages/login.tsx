import { Typography } from "@mui/material";
import  { FC, Fragment, useContext, useState } from "react";
import { authService, serviceSupportedNetworks } from "../../config/service-config";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../common/loginForm";
import courseData from "../../config/courseData.json"
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-config";
import CoursesContext from "../../store/context";
const Login: FC = () => {
    
    const [flNavigate, setFlNavigate] = useState<boolean>(false);
async function loginFn(loginData: LoginData):Promise<boolean> {
    const res = await authService.login(loginData);
    if (res) {
        setFlNavigate(true);
    }
    return res;


}
    return <Fragment>
        <LoginForm loginFn={loginFn} passwordValidationFn={function (password: string): string {
        return password.length < courseData.passwordLength ?
         `length of password can't be less than ${courseData.passwordLength}` : ''
    } } networks={serviceSupportedNetworks}></LoginForm>
    {flNavigate && <Navigate to={PATH_COURSES}></Navigate>}
    </Fragment>
}
export default Login;