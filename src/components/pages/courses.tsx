import { Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { FC, useContext } from "react";
import { Delete } from "@mui/icons-material";
import CoursesContext from "../../store/context";
const Courses: FC = () => {
    const storeValue = useContext(CoursesContext);
    return <Typography>Courses count: {storeValue.list.length}
        <List>
            {storeValue.list.map(course =>
                <ListItem key={course.id}>
                    <ListItemButton onClick={storeValue.remove?.bind(this, course.id)}><Delete /></ListItemButton>
                    <ListItemText>{course.id} / {course.courseName} / {course.lecturerName} / {course.cost}</ListItemText>
                </ListItem>)}
        </List>
    </Typography>;
}
export default Courses;