import _, { Dictionary } from 'lodash';
import Course from '../models/course';
export function getElement(courses: Course[], isCost: boolean, interval: number) {

    let objStat = _.countBy(courses, e => {
        return Math.floor((isCost ? e.cost : e.hoursNum) / interval) * interval;
    });
    return getInterval(objStat, interval)
}

function getInterval(objStat: Dictionary<number>, interval: number) {
    let res = [];
    for (let key in objStat) {
        let minInterval = key;
        let maxInterval = +key + +interval - 1;
        let amount = objStat[key];
        res.push({ minInterval: minInterval, maxInterval: maxInterval, amount: amount });
    }
    return res;
}