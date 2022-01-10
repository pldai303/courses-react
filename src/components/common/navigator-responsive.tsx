import { useMediaQuery } from "react-responsive";
import { FC } from "react";
import { RouteType } from "../../models/common/route-type";
import NavigatorWeb from "./navigator-web";
import NavigatorDrawer from "./navigator-mobile";
const NavigatorResponsive: FC<{ items: RouteType[] }> = (props) => {
    const isMobileOrLaptop = useMediaQuery({
        query: '(min-width: 900px)'
    });
    return <div>
        {isMobileOrLaptop ? <NavigatorWeb items={props.items}></NavigatorWeb> :
         <NavigatorDrawer items={props.items}></NavigatorDrawer>}
    </div>
    } 
    export default NavigatorResponsive; 


