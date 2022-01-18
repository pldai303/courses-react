import { Typography, Button } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "../../config/routes-config";
import { authService } from "../../config/service-config";
const Logout: FC = () => {
    const [flNavigate, setFlNavigate] = useState<boolean>(false);
    async function logout() {
        const res = await authService.logout();
        if (res) {
            setFlNavigate(true);
        }

    }
    return <Fragment>
        <Button onClick={logout}>Confirm Logout</Button>
        {flNavigate && <Navigate to={PATH_LOGIN}></Navigate>}
    </Fragment>
}
export default Logout;