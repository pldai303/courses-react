

export  type ConfirmationData = {
    title: string;
    message: string;
    handle: (status:boolean)=>void
}
export const emptyConfirmationData: ConfirmationData = {
    title:'',
    message: '',
    handle: (status: boolean)=>{}
}