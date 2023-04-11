import { getDay, getWeek, getDateName } from "./time";

export function rruleToObj(rrule) {
    let hold = rrule.replaceAll('RRULE:', '').split(';');
    rrule = {};
    hold.forEach((pair)=>{
        pair = pair.split('=');
        rrule[pair[0]] = pair[1];
        if (pair[1].indexOf(',')>=0){
            rrule[pair[0]] = pair[1].split(',');
        }
    });

    return rrule;
}

export function objToRrule(obj) {
    let rrule = '';
    Object.keys(obj).forEach((key)=>{
        if (obj[key] instanceof Array) {
            rrule = rrule.concat(';' + key, '=', obj[key].join(','));
        } else {
            rrule = rrule.concat(';' + key, '=', obj[key]);
        }
    });
    rrule = rrule.replace(';', 'RRULE:');
    return rrule;
}

export function rruleMonthlyByDayFrom(date) {
    return `BYMONTHDAY=${getDay(date)}`;
}

export function rruleMonthlyByWeekFrom(date) {
    return `BYWEEKNO=${getWeek(date)};BYDAY=${getDateName(date, true).substring(0,2)}`;
}