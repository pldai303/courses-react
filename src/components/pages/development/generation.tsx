import {FC, useContext, useEffect, useState} from 'react';
import CoursesContext from '../../../store/context';
import { TextField, Button, Box } from '@mui/material';
import { createRandomCourses } from '../../../utils/random-course';
import { college } from '../../../config/service-config';
const defaultValue = 10;
const MAX_COURSES = 100;
const Generation: FC = () => {
    const [nCourses, setNCourses] = useState(defaultValue);
    const [isValid, setValid] = useState<boolean>(true);
    const storeValue = useContext(CoursesContext);
    function changeHandler(event: any) {
        setNCourses(+event.target.value);
    }
      function generate() {
        const courses = createRandomCourses(nCourses);
        courses.forEach(async (course)=> {
            await college.addCourse(course);
        })
    }
    useEffect(() => {
        setValid(nCourses >= 1 && nCourses <= MAX_COURSES);
    }, [nCourses])
    return <Box>
        <TextField type="number" placeholder="courses number" label="How many courses"
         defaultValue={defaultValue} onChange={changeHandler} error={!isValid}
          helperText = {!isValid ? `Courses number should be in the range [1 - ${MAX_COURSES}]` : ''}>

        </TextField>
        <Button onClick={generate} disabled={!isValid}>Generate</Button>
    </Box>
}
export default Generation;