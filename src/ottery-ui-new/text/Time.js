export const TIME = {
    date: 'date',
    time: 'time',
    md: 'month-day',
};

//Probably should use a library...
export function Time({time, type}) {
    time = new Date(time);

    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');

    const hour = String(time.getHours()).padStart(2, '0');
    const minute = String(time.getMinutes()).padStart(2, '0');
    const second = String(time.getSeconds()).padStart(2, '0');

    if (type===TIME.date) {
        return `${year}-${month}-${day}`;
    } else if (type===TIME.time) {
        return `${hour}:${minute}:${second}`;
    } else if (type===TIME.md){
        return `${month}-${day}`
    } else {
        return time.toString();
    }
}