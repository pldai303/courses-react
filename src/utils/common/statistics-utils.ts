import _ from 'lodash';



export function getStatistics(objects: object[], interval: number, field: string) {
    let objCnt = _.countBy(objects, e => {
        return Math.floor((e as any)[field] / interval); 
    });


    return getInterval(objCnt, interval);

}

function getInterval(objCnt: _.Dictionary<number>, interval: number) {
    return Object.entries(objCnt).map(([key, value]) => {
        let minInterval = +key * interval;
        let maxInterval = minInterval + interval - 1;
        let amount = +value;
        return {
            minInterval: minInterval, maxInterval: maxInterval,
            amount: amount
        };
    });
}
