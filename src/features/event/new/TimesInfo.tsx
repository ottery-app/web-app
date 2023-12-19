import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { isDate, isRecurrence } from "@ottery/ottery-dto";

import TimeInput, {
  TimeValueType,
} from "../../../../ottery-ui/input/TimeInput";
import Head from "./components/UI/Head";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import {
  formatTime,
  getTime,
  setDate as setDateFields,
} from "../../../functions/time";
import DateInput from "../../../../ottery-ui/input/DateInput";
import Main from "./components/UI/Main";
import { Dropdown, DropdownOption } from "../../../../ottery-ui/input/Dropdown";
import CustomRepeat from "./components/CustomRepeat";

//https://www.rfc-editor.org/rfc/rfc5545#section-3.8.5

//example
//RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=8;WKST=SU;BYDAY=TU,TH
//RRULE:FREQ=YEARLY;BYWEEKNO=20;BYDAY=MO

const TIMEPROTOCOLS = {
  "RRULE:FREQ=DAILY;COUNT=1": "Does not repeat",
  "RRULE:FREQ=DAILY": "Daily",
  "RRULE:FREQ=WEEKLY": "Weekly",
  "RRULE:FREQ=MONTHLY": "Monthly",
  "RRULE:FREQ=YEARLY": "Yearly",
  "RRULE:WKST=MO,TU,WE,TH,FR": "Every weekday",
};

function TimesForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  const [date, setDate] = useState(form.start);
  const [start, setStart] = useState(getTime(form.start));
  const [end, setEnd] = useState(getTime(form.end));
  const [repeat, setRepeat] = useState(form.recurrence[0]);

  useEffect(() => {
    const unixStart = setDateFields(date, start.hours, start.minutes);
    const unixEnd = setDateFields(date, end.hours, end.minutes);

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
    setStart(time);
  }

  function handleEndChange(time: TimeValueType) {
    setEnd(time);
  }

  function handleRepeatChange({ value: repeat }: DropdownOption) {
    setRepeat(repeat);
  }

  const repeatOptions = useMemo(() => {
    const options = Object.entries(TIMEPROTOCOLS).map(([key, value]) => {
      return { label: value, value: key.replaceAll("_", " ") };
    });
    if (repeat && !TIMEPROTOCOLS[repeat]) {
      options.push({ label: "Custom...", value: repeat });
    } else {
      options.push({ label: "Custom...", value: "CUSTOM" });
    }

    return options;
  }, [repeat]);

  const customRepeat = useMemo(() => {
    if (repeat === "CUSTOM") {
      return "RRULE:FREQ=WEEKLY";
    }
    return repeat;
  }, [repeat]);

  return (
    <Main>
      <Head>Time</Head>
      <DateInput label="Date" onChange={handleDateChange} value={date} />
      <View style={styles.timesContainer}>
        <TimeInput label="Start" onChange={handleStartChange} value={start} />
        <Text style={styles.timesText}>to</Text>
        <TimeInput label="End" onChange={handleEndChange} value={end} />
      </View>
      <Dropdown
        label="repeat"
        onChange={handleRepeatChange}
        options={repeatOptions}
        value={repeat}
      />
      {((repeat && !TIMEPROTOCOLS[repeat]) || repeat === "CUSTOM") && (
        <CustomRepeat custom={customRepeat} date={date} setCustom={setRepeat} />
      )}
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
