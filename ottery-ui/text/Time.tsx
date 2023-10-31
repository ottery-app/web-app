import { useMemo } from "react";
import {Text} from "react-native-paper";

export enum DateFormat {
  time = "time",
  mdy = "date",
  md = "month-day",
  passed = "passed",
  smallest = "smallest",
}

const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

function timeElapsedSince(date) {
  date = new Date(date);
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedWeeks = Math.floor(elapsedDays / 7); // Replace months with weeks
  const elapsedYears = Math.floor(elapsedWeeks / 52); // Approximating a year as 52 weeks

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} m`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} h`;
  } else if (elapsedDays < 7) { // If less than a week, you can display in days
    return `${elapsedDays} d`;
  } else if (elapsedWeeks < 52) {
    return `${elapsedWeeks} w`;
  } else {
    return `${elapsedYears} y`;
  }
}

function isDateFurtherThanOneDayAway(date) {
  const now = new Date();
  date = new Date(date);
  const timeDifference = now.getTime() - date.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference > 24;
}

function isDateFurtherThanOneYearAway(date) {
  const now = new Date();
  date = new Date(date);
  const timeDifference = now.getTime() - date.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference > 365;
}

export function Time({ time, type, color=undefined }) {
  time = useMemo(()=>{
    if (type === DateFormat.passed) {
      time = timeElapsedSince(time);
    } else {
      time = new Date(time);
  
      if (type === DateFormat.smallest) {
        if (isDateFurtherThanOneYearAway(time)) {
          type = DateFormat.mdy;
        } else if (isDateFurtherThanOneDayAway(time)) {
          type = DateFormat.md;
        } else {
          type = DateFormat.time;
        }
      }
  
      const year = time.getFullYear();
      const month = months[String(time.getMonth() + 1).padStart(2, "0")];
      const day = String(time.getDate()).padStart(2, "0");
    
      const hour = String(time.getHours()).padStart(2, "0");
      const minute = String(time.getMinutes()).padStart(2, "0");
      const second = String(time.getSeconds()).padStart(2, "0");
    
      if (type === DateFormat.mdy) {
        time = `${month} ${day} ${year}`;
      } else if (type === DateFormat.time) {
        let twelve = +hour;
        let marker = "am";
  
        if (twelve >= 13) {
          twelve = twelve - 12;
          marker = "pm";
        } else if (twelve === 0) {
          twelve = 12;
        }
  
        time = `${twelve}:${minute} ${marker}`;
      } else if (type === DateFormat.md) {
        time = `${month} ${day}`;
      } else {
        time = time.toString();
      }
    }

    return time;
  }, [time, type]);

  return <Text style={{color:color}}>{time}</Text>
}
