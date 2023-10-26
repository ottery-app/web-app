import {Text} from "react-native-paper";

export enum DateFormat {
  date = "date",
  time = "time",
  md = "month-day",
}

export function Time({ time, type, color=undefined }) {
  time = new Date(time);

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");

  const hour = String(time.getHours()).padStart(2, "0");
  const minute = String(time.getMinutes()).padStart(2, "0");
  const second = String(time.getSeconds()).padStart(2, "0");

  if (type === DateFormat.date) {
    time = `${year}-${month}-${day}`;
  } else if (type === DateFormat.time) {
    time = `${hour}:${minute}:${second}`;
  } else if (type === DateFormat.md) {
    time = `${month}-${day}`;
  } else {
    time = time.toString();
  }

  return <Text style={{color:color}}>{time}</Text>
}
