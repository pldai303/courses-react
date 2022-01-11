import { Button, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { createRandomCourses, getRandomCourse } from "../../utils/random-course";
const AddCourse: FC = () => {
    const storeValue = useContext(CoursesContext);

    function addNewRandom() {

        storeValue.add!(getRandomCourse());
    }

    return <Typography>Add Courses
        <Button onClick={addNewRandom}>Add new random course</Button>
    </Typography>;
}
export default AddCourse;