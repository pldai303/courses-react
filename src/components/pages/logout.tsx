import { Typography, Button } from "@mui/material";
import React, { FC } from "react";
import { authService } from "../../config/service-config";
const Logout: FC = () => {
    return <Button onClick={() => authService.logout()}>Confirm Logout</Button>
}
export default Logout;