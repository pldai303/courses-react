import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { getElement } from "../../utils/courses-utils";
const StatisticsHours: FC = () => {
    const storeValue = useContext(CoursesContext);

    return <Typography>Cost Statistic:
        <List>
            {getElement(storeValue.list, false, 100).map((el, index) => <ListItem key={index}><ListItemText>Min: {el.minInterval} / Max: {el.maxInterval} / Amount: {el.amount}</ListItemText></ListItem>)}
        </List>
    </Typography>;
}
export default StatisticsHours;