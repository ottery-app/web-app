import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { isDate, isRecurrence } from "@ottery/ottery-dto";

import TimeInput, {
  TimeValueType,
} from "../../../../ottery-ui/input/TimeInput";
import Head from "./components/UI/Head";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import { formatTime, setDate as setDateFields } from "../../../functions/time";
import DateInput from "../../../../ottery-ui/input/DateInput";
import Main from "./components/UI/Main";

function TimesForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  const [date, setDate] = useState(form.start);
  const [start, setStart] = useState(formatTime(form.start));
  const [end, setEnd] = useState(formatTime(form.end));
  const [repeat, setRepeat] = useState(form.recurrence[0]);

  useEffect(() => {
    const unixStart = setDateFields(
      date,
      ...start.split(":").map((seg) => +seg)
    );
    const unixEnd = setDateFields(date, ...end.split(":").map((seg) => +seg));

    updateErrorHandler(() => {
      if (!isDate(date)) {
        return "Not a valid date";
      }

      if (!start) {
        return "Not a valid start time";
      }

      if (!end) {
        return "Not a valid end time";
      }

      if (!isRecurrence(repeat)) {
        return "Not a valid custom time. Check for empty fields";
      }

      if (unixEnd <= unixStart) {
        return "End time must be greater then start time";
      }
    });

    setForm((form) => {
      return {
        ...form,
        start: unixStart,
        end: unixEnd,
        recurrence: [repeat],
      };
    });
  }, [date, start, end, repeat]);

  function handleDateChange(date: number) {
    setDate(date);
  }

  function handleStartChange(time: TimeValueType) {
    setStart(`${time.hours}:${time.minutes}`);
  }

  function handleEndChange(time: TimeValueType) {
    setEnd(`${time.hours}:${time.minutes}`);
  }

  return (
    <Main>
      <Head>Time</Head>
      <DateInput label="Date" onChange={handleDateChange} value={date} />
      <View style={styles.timesContainer}>
        <TimeInput
          label="Start"
          onChange={handleStartChange}
          value={{ hours: 15, minutes: 35 }}
        />
        <Text style={styles.timesText}>to</Text>
        <TimeInput
          label="End"
          onChange={handleEndChange}
          value={{ hours: 15, minutes: 35 }}
        />
      </View>
    </Main>
  );
}

const styles = StyleSheet.create({
  timesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timesText: {
    marginHorizontal: 10,
  },
});

export default TimesForm;
