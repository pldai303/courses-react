import { Tabs, Tab } from "@mui/material";
import {useState, FC, ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";
import { isTemplateSpan } from "typescript";
import { RouteType } from "../../models/common/route-type";
function getInitialActiveTabIndex(path: string, items: RouteType[]): number {
    let res = items.findIndex(item => path === item.path);
    
    return res < 0 ? 0 : res

}
const NavigatorWeb:FC<{items: RouteType[]}> = (props) => {
    
    const location = useLocation();
   
    const [activeTabIndex, setActiveTab] = useState(getInitialActiveTabIndex(location.pathname, props.items));
    function getTabs(): ReactNode[] {
        return props.items.map(item => <Tab key={item.label} component={Link} to={item.path} label={item.label}/>)
    }
    function onChangeHandler(event: any, newValue: number) {
        setActiveTab(newValue);
    }
    return <Tabs value={activeTabIndex} onChange={onChangeHandler}>
        {getTabs()}
    </Tabs>
}
export default NavigatorWeb;