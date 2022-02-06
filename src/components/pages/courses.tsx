import {  Paper, Box } from "@mui/material";
import { FC, useContext, useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Delete, Visibility } from "@mui/icons-material";
import { GridColumns, GridRowsProp, DataGrid, GridActionsCellItem, GridRowParams, GridCellEditCommitParams } from "@mui/x-data-grid";
import { UserData } from "../../models/common/user-data";
import Course from "../../models/course";
import ActionConfirmation from "../common/action-confirmation";
import ModalInfo from "../common/modal-info";
import courseData from "../../config/courseData.json"
import { CourseFieldName, dashboardCourseSizes } from "../../config/dashboard-config";
import { useMediaQuery } from "react-responsive";
import { ConfirmationData, emptyConfirmationData } from "../../models/common/confirmation-data-type";
import { useDispatch, useSelector } from "react-redux";
import { coursesSelector, userDataSelector } from "../../redux/store";
import { addCourseAction, removeCourseAction, updateCourseAction } from "../../redux/actions";

function getInfo(course: Course): string[] {
    const res: string[] = [
        `Course ID  : ${course.id}`,
        `Course Name: ${course.courseName}`,
        `Lecturer   : ${course.lecturerName}`,
        `Hours      : ${course.hoursNum}`,
        `Cost : ${course.cost}`,
        `Openning Date : ${course.startDate.toLocaleDateString()}`,
        `Course Type : ${course.type}`,
        `Timing  : ${course.dayEvening.join(';')}`
    ];
    return res;
}
function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => course);
}
const Courses: FC = () => {

    const dispatch = useDispatch();
    const confirmationData = useRef<ConfirmationData>(emptyConfirmationData);
    const userData: UserData = useSelector(userDataSelector);
    const courses: Course[] = useSelector(coursesSelector);
   
    
    const [flUndo, setFlUndo] = useState(false);
    
    const [sizedColumns, setSizedColumns] = useState<any[]>([]);
    const rows = useMemo(() => getRows(courses), [courses, flUndo]);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    
    const [modalVisible, setModalVisible] = useState(false);
    
    function getFilteredColumns(fields: CourseFieldName[]): any[] {
        return getColumns(userData).filter(column => fields.includes(column.field as any));
    }
    const isPortraitMobile = useMediaQuery({ maxWidth: 600, orientation: 'portrait' });
    const isLandscape = useMediaQuery({ maxWidth: 900 });
    const mode = useMemo(() => getMode(), [isPortraitMobile, isLandscape]);
    function getMode(): string {
        if (isPortraitMobile) {
            return 'isPortraitMobile';
        }
        if (isLandscape) {
            return 'isLandscape'
        }
        return 'isNotMobile';
    }
    const callbackMode = useCallback(() =>
        setSizedColumns(getFilteredColumns((dashboardCourseSizes as any)[mode])), [userData, mode]);
    const textModal = useRef<string[]>(['']);

    useEffect(() => {

        callbackMode();
    }, [ callbackMode])
    function getColumns(userData: UserData): GridColumns {
        return [
            { field: 'courseName', headerName: 'Course Name', flex: 150, align: 'center', headerAlign: 'center' },
            { field: 'lecturerName',type:'singleSelect', valueOptions: courseData.lecturers, headerName: 'Lecturer', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center', flex: 120 },
            {
                field: 'hoursNum', headerName: 'Hours', type: 'number', editable: !!userData.isAdmin,
                preProcessEditCellProps: (params: any) => {
                    const hours = +params.props.value
                    const hasError = hours < courseData.minHours || hours > courseData.maxHours;
                    return { ...params.props, error: hasError };
                },
                align: 'center', headerAlign: 'center'
            },
            { field: 'cost', headerName: 'Cost', type: 'number', editable: !!userData.isAdmin,preProcessEditCellProps: (params: any) => {
                const cost = +params.props.value
                const hasError = cost < courseData.minCost || cost > courseData.maxCost;
                return { ...params.props, error: hasError };
            }, align: 'center', headerAlign: 'center' },
            { field: 'startDate', headerName: 'Openning Date', type: 'date', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center', flex: 200 },
            {
                field: 'actions', type: 'actions', width: 70, getActions: (params: GridRowParams) => {
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
    function findCourseData(id: number): Course | undefined {
        return courses.find(item => item.id === id);
    }
    function onEdit(element: GridCellEditCommitParams) {
        const course: any = findCourseData(element.id as number);
        if (course) {
            const oldValue = course[element.field];
            const newValue = element.value;
            if (oldValue !== newValue) {
                // Show confirmation dialog
                confirmationData.current.title="Update Confirmation";
                confirmationData.current.message = `Old value is: ${element.field === 'startDate' ? oldValue.toDateString() : oldValue}, 
                                    new value is: ${element.field === 'startDate' ? new Date(newValue as string).toDateString() : newValue}. 
                                    Confirm the change?`;

                 const updatedCourse = {...course!, [element.field]: element.value};
                confirmationData.current.handle = handleUpdate.bind(undefined, updatedCourse);
                setConfirmOpen(true);
            }
        }       
    }

    function showRemoveConfirmation(id: number): void {
       
        confirmationData.current.message = `Are you sure you want to remove course with ID '${id}'?`
        confirmationData.current.handle = handleRemove.bind(undefined, id);
        confirmationData.current.title = "Remove Confirmation";
        setConfirmOpen(true);
    }
    function handleUpdate(course: Course, status: boolean): void {
        if(status) {
           dispatch( updateCourseAction(course.id, course));
        }
        else {
            setFlUndo(!flUndo); 
        }
        setConfirmOpen(false);
    }
    function handleRemove(id: number, status: boolean): void {
        
        if (status) {
            
            dispatch(removeCourseAction(id));
        }
        setConfirmOpen(false);
    }
    function showDetails(id: any) {
        const course = courses.find(e => e.id === +id);
        if (!!course) {

            textModal.current = getInfo(course);

        } else {
            textModal.current = ["Not found"];

        }
        setModalVisible(true);
    }
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
    '& .Mui-error': { bgcolor: '#FF9494', color: 'white', width: '100%', height: '100%' } }}>
        <Paper sx={{ width: { xs: '100vw', sm: '80vw'}, height: '80vh', marginTop: '2vh' }}>
            <DataGrid rows={rows} columns={sizedColumns} onCellEditCommit={onEdit} />
        </Paper>
        <ActionConfirmation isVisible={confirmOpen} title={confirmationData.current.title}
            message={confirmationData.current.message}
            onClose={confirmationData.current.handle} />
        <ModalInfo title={"Detailed information about the courses"}
            message={textModal.current} visible={modalVisible} callBack={() => setModalVisible(false)} />
    </Box>

}
export default Courses;
