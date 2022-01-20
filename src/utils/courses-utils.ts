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
export function getStatistics(courses:Course[], interval: number, isCost:boolean) {
    let variant = isCost ? "cost" : "hoursNum";
    let objCnt = _.countBy(courses, e => {
      return Math.floor((e as any)[variant] / interval) * interval;
    });

    return Object.entries(objCnt).map(([key, value]) => {
      let minInterval = key;
      let maxInterval = +key + +key - 1;
      let amount = value;
      return { minInterval: minInterval, maxInterval: maxInterval, amount: amount}
    });

}