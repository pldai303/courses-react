import { Typography, List, ListItem, ListItemButton, ListItemText, Paper, Box } from "@mui/material";
import React, { FC, useContext, useState, useMemo, useEffect, useRef } from "react";
import { Delete, Visibility, Edit } from "@mui/icons-material";
import CoursesContext from "../../store/context";
import { GridColDef, GridRowsProp, DataGrid, GridActionsCellItem, GridRowParams, GridCellEditCommitParams } from "@mui/x-data-grid";
import { UserData } from "../../models/common/user-data";
import Course from "../../models/course";
import ActionConfirmation from "../common/action-confirmation";
import ModalInfo from "../common/modal-info";
import courseData from "../../config/courseData.json"

function getInfo(course: Course): string[] {
    const res: string[] = [
        `Course ID  : ${course.id}`,
        `Course Name: ${course.courseName}`,
        `Lecturer   : ${course.lecturerName}`,
        `Hours      : ${course.hoursNum}`,
        `Openning Date : ${course.startDate.toLocaleDateString()}`,
        `Course Type : ${course.type}`,
        `Timing  : ${course.dayEvening.join(';')}`
    ]
    return res;
}
function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => course);
}
const Courses: FC = () => {

    const storeValue = useContext(CoursesContext);
    const [columns, setColumns] = useState(getColumns(storeValue.userData));
    const rows = useMemo(() => getRows(storeValue.list), [storeValue.list]);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [removeID, setRemoveID] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);

    

    const textModal = useRef<string[]>(['']);
    useEffect(() => {
        setColumns(getColumns(storeValue.userData));

    }, [storeValue]);
    function getColumns(userData: UserData): any[] {
        return [
            { field: 'name', headerName: 'Course Name', flex: 150, align: 'center', headerAlign: 'center' },
            { field: 'lecturer', headerName: 'Lecturer', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center', flex: 120 },
            { field: 'hoursNum', headerName: 'Hours', type: 'number', editable: !!userData.isAdmin,
            preProcessEditCellProps: (params: any) => {
                const hours = +params.props.value
                const hasError = hours < courseData.minHours || hours > courseData.maxHours;
                return { ...params.props, error: hasError };
              },
             align: 'center', headerAlign: 'center' },
            { field: 'cost', headerName: 'Cost', type: 'number', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center' },
            { field: 'startDate', headerName: 'Openning Date', type: 'date', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center', flex: 200 },
            {
                field: 'actions', type: 'actions', getActions: (params: GridRowParams) => {
                    const actionItems = [<GridActionsCellItem icon={<Visibility />} label='Details'
                        onClick={() => showDetails(params.id as number)}></GridActionsCellItem>];
                    if (userData.isAdmin) {
                        actionItems.push(<GridActionsCellItem icon={<Delete />} label='Remove'
                            onClick={() => showRemoveConfirmation(params.id as number)} />)

                    }

                    return actionItems;
                }

            }
        ]
    };

    

    function onEdit(params: GridCellEditCommitParams) {
        console.log(params);
    }

    function showRemoveConfirmation(id: number): void {
        setRemoveID(id);
        setConfirmOpen(true);
    }

    function handleRemove(status: boolean): void {
        if (status) {
            storeValue.remove!(removeID);
        }
        setConfirmOpen(false);
    }
    function showDetails(id: any) {
        const course = storeValue.list.find(e => e.id === +id);
        if (!!course) {

           textModal.current = getInfo(course);

        } else {
            textModal.current = ["Not found"];

        }
        setModalVisible(true);
    }
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ width: '80vw', height: '80vh', marginTop: '2vh' }}>
            <DataGrid rows={rows} columns={columns} onCellEditCommit={onEdit}/>


        </Paper>
        <ActionConfirmation isVisible={confirmOpen} title="Course Remove"
            message={`Are you sure you want to remove course with ID '${removeID}'?`}
            onClose={handleRemove} />
        <ModalInfo title={"Detailed information about the courses"}
            message={textModal.current} visible={modalVisible} callBack={() => setModalVisible(false)} />
    </Box>

}
export default Courses;


