import { getDay, getWeek, getDateName } from "./time";

export function rruleToObj(rruleString: string) {
  let hold = rruleString.replaceAll("RRULE:", "").split(";");
  const rrule = {};
  hold.forEach((pair) => {
    const pairArr = pair.split("=");
    rrule[pairArr[0]] = pairArr[1];
    if (pairArr[1].indexOf(",") >= 0) {
      rrule[pairArr[0]] = pairArr[1].split(",");
    }
  });

  return rrule;
}

export function objToRrule(obj: Object) {
  let rrule = "";
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Array) {
      rrule = rrule.concat(";" + key, "=", obj[key].join(","));
    } else {
      rrule = rrule.concat(";" + key, "=", obj[key]);
    }
  });
  rrule = rrule.replace(";", "RRULE:");
  return rrule;
}

export function rruleMonthlyByDayFrom(date: string | number | Date) {
  return `BYMONTHDAY=${getDay(date)}`;
}

export function rruleMonthlyByWeekFrom(date: string | number | Date) {
  return `BYWEEKNO=${getWeek(date)};BYDAY=${getDateName(date, true).substring(
    0,
    2
  )}`;
}
