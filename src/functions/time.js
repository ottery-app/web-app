export function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatTime(date) {
    return new Date(date).toString().split(" ")[4].substring(0, 5);
}

export function formatDate(date) {
    if (date) {
        return new Date(date).toISOString().split('T')[0]
    }
}

export function getDateName(date, caps=false) {
    date = new Date(date);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (caps) {
        return days[date.getDay()].toUpperCase();
    } else {
        return days[date.getDay()];
    }
}

export function getDay(date) {
    return new Date(date).getDate();
}

export function getWeek(date) {
    date = new Date(date);
    //find the year of the current date  
    const oneJan =  new Date(date.getFullYear(), 0, 1);   
    // calculating number of days in given year before a given date   
    const numberOfDays =  Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));   
    // adding 1 since to current date and returns value starting from 0   
    return Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);     
}

export function getWeekInMonth(date) {
    let that = new Date(date);
    var month = that.getMonth()
        , year = that.getFullYear()
        , firstWeekday = new Date(year, month, 1).getDay()
        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        , offsetDate = that.getDate() + firstWeekday - 1
        , index = 1 // start index at 0 or 1, your choice
        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
        , week = index + Math.floor(offsetDate / 7)
    ;
    if (week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;
}

export function setDate(date, hours, mins, seconds) {
    date = new Date(date);
    if (hours) {
        date.setHours(hours);
    }
    if (mins) {
        date.setMinutes(mins);
    }
    if (seconds) {
        date.setSeconds(seconds);
    }
    return date.getTime();
}