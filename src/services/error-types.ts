type ErrorTypes = {
    code: number;
    message: string;
}

const arr: ErrorTypes[] = [
    { "code": 200, "message": "OK [Code : 200]" },
    { "code": 401, "message": "Unauthorized [Code : 401]" },
    { "code": 403, "message": "Forbidden [Code : 403]" }
];

function getErrorType(errorStatus : number) : ErrorTypes {
    const unknownErr : ErrorTypes = {"code": 0, "message": "No such error"};
    const errObj = arr.find(k => k.code === errorStatus);
    return ( errObj == null ? unknownErr : errObj)
}


export default getErrorType;
