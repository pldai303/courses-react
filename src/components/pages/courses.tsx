import { Typography, List, ListItem, ListItemButton, ListItemText, Paper, Box } from "@mui/material";
import React, { FC, useContext, useState, useMemo, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import CoursesContext from "../../store/context";
import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import { UserData } from "../../models/common/user-data";
import Course from "../../models/course";
function getColumns(userData: UserData): GridColDef[] {
    return [
        { field: 'courseName', headerName: 'Course Name', flex: 150, align: 'center', headerAlign:'center' },
        { field: 'lecturerName', headerName: 'Lecturer', editable: !!userData.isAdmin,align:'center', headerAlign: 'center', flex: 120 },
        { field: 'hoursNum', headerName: 'Hours', type: 'number', editable: !!userData.isAdmin,align:'center', headerAlign: 'center' },
        { field: 'cost', headerName: 'Cost', type: 'number', editable: !!userData.isAdmin,align:'center', headerAlign: 'center' },
        { field: 'startDate', headerName: 'Openning Date', type: 'date', editable: !!userData.isAdmin,align:'center', headerAlign: 'center', flex:200 }
        //TODO actions
    ]
}
function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => course);
}
const Courses: FC = () => {

    const storeValue = useContext(CoursesContext);
    const [columns, setColumns] = useState(getColumns(storeValue.userData));
    const rows = useMemo(() => getRows(storeValue.list), [storeValue.list]);
    useEffect(() => {
        setColumns(getColumns(storeValue.userData));
    }, [storeValue.userData])
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ width: '80vw', height: '80vh' }}>
            <DataGrid rows={rows} columns={columns}/>
        </Paper>
    </Box>
}
export default Courses;