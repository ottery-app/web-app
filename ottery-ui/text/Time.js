import React from "react";
import { Text } from "react-native-paper";

export const TIME = {
  date: "date",
  time: "time",
  md: "month-day",
};

export function Time({ time, type }) {
  time = new Date(time);

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");

  const hour = String(time.getHours()).padStart(2, "0");
  const minute = String(time.getMinutes()).padStart(2, "0");
  const second = String(time.getSeconds()).padStart(2, "0");

  if (type === TIME.date) {
    return (
      <Text>
        {year}-{month}-{day}
      </Text>
    );
  } else if (type === TIME.time) {
    return (
      <Text>
        {hour}:{minute}:{second}
      </Text>
    );
  } else if (type === TIME.md) {
    return (
      <Text>
        {month}-{day}
      </Text>
    );
  } else {
    return <Text>{time.toString()}</Text>;
  }
}
