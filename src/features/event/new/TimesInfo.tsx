import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { isDate, isRRule } from "@ottery/ottery-dto";

import TimeInput, {
  TimeValueType,
} from "../../../../ottery-ui/input/TimeInput";
import Head from "./components/UI/Head";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import {
  getTime,
  setDate as setDateFields,
} from "../../../functions/time";
import DateInput from "../../../../ottery-ui/input/DateInput";
import Main from "./components/UI/Main";
import { Dropdown, DropdownOption } from "../../../../ottery-ui/input/Dropdown";
import CustomRepeat from "./components/CustomRepeat";
import { RRule } from "rrule";
import { margin } from "../../../../ottery-ui/styles/margin";

//https://www.rfc-editor.org/rfc/rfc5545#section-3.8.5

//example
//RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=8;WKST=SU;BYDAY=TU,TH
//RRULE:FREQ=YEARLY;BYWEEKNO=20;BYDAY=MO

const TIMEPROTOCOLS = {
  [new RRule({ freq: RRule.DAILY, count: 1 }).toString()]: 'Does not repeat',
  [new RRule({ freq: RRule.DAILY }).toString()]: 'Daily',
  [new RRule({ freq: RRule.WEEKLY }).toString()]: 'Weekly',
  [new RRule({ freq: RRule.MONTHLY }).toString()]: 'Monthly',
  [new RRule({ freq: RRule.YEARLY }).toString()]: 'Yearly',
  [new RRule({ freq: RRule.WEEKLY, byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR] }).toString()]: 'Every weekday',
};

function TimesForm({
  form,
  setForm,
  updateErrorHandler,
}: StepProps<EventFormData>) {
  /**
   * This function is used to update the date that the event is on, not the time of the event.
   */
  function handleDateChange(value: number): void {
    const currentDate = form.rrule.options.dtstart || new Date();
    value = new Date(value).getDate();
    currentDate.setDate(value);
    form.rrule.options.dtstart = currentDate;
    console.log(form, currentDate);
    setForm({...form})
  }

  /**
   * This function is used to update the time that the event starts in the day.
   */
  function handleStartChange(value: TimeValueType): void {
    const currentDate = form.rrule.options.dtstart || new Date();
    currentDate.setHours(value.hours);
    currentDate.setMinutes(value.minutes);
    form.rrule.options.dtstart = currentDate;
    setForm({...form})
  }

  /**
   * This function is used to update the time that the event ends in the day.
   * @param value - An object containing hours and minutes for the new end time
   */
  function handleEndChange(value: TimeValueType): void {
    form.durration = (value.hours * 3600000) + (value.minutes * 60000);
    setForm({ ...form });
  }

  /**
   * Function to get the date from an RRule object's dtstart property
   */
  function getDate(): number {
    const dtstart = form.rrule.options.dtstart;
    if (dtstart instanceof Date) {
      return dtstart.getTime();
    }
    return new Date().getTime(); // Return current time if dtstart is not a Date object
  }

  /**
   * Function to get the start time from an RRule object's dtstart property
   */
  function getStart(): TimeValueType {
    const dtstart = form.rrule.options.dtstart;
    if (dtstart instanceof Date) {
      return {
        hours: dtstart.getHours(),
        minutes: dtstart.getMinutes(),
      };
    }
    return { hours: 0, minutes: 0 }; // Return default time if dtstart is not a Date object
  }

  /**
   * Function to get the end time from an RRule object based on duration
   */
  function getEnd(): TimeValueType {
    const start = getStart();

    const totalMinutes = Math.floor(form.durration / (1000 * 60)); // Convert milliseconds to total minutes
    const hours = Math.floor(totalMinutes / 60); // Calculate hours
    const minutes = totalMinutes % 60; // Calculate remaining minutes

    return { hours: start.hours + hours, minutes: start.minutes + minutes };
  }

  function handleRepeatChange(option: DropdownOption) {
    console.log(option.value);
    const start = form?.rrule?.options?.dtstart;
    form.rrule = RRule.fromString(option.value);
    form.rrule.options.dtstart = start;
    setForm({...form});
  }

  function getRepeatOptions() {
    console.log(form.rrule.toString())
    // Get the RRULE string representation
    const ruleString = form.rrule.toString(); // This will give you a string representation of the rule

    // Extract just the RRULE part from the string
    const RRULEIndex = ruleString.indexOf('RRULE:');
    const RRULEString = RRULEIndex !== -1 ? ruleString.slice(RRULEIndex) : '';
    console.log(RRULEString);
    return RRULEString;
  }

  function updateRRule(rrule:RRule) {
    setForm({
      ...form,
      rrule: rrule,
    })
  }

  return (
    <Main>
      <Head>Time</Head>
      <DateInput label="Date" onChange={handleDateChange} value={getDate()} />
      <View style={styles.timesContainer}>
        <TimeInput label="Start" onChange={handleStartChange} value={getStart()} />
        <Text style={styles.timesText}>to</Text>
        <TimeInput label="End" onChange={handleEndChange} value={getEnd()} />
      </View>
      <Dropdown
        label="repeat"
        onChange={handleRepeatChange}
        options={Object.keys(TIMEPROTOCOLS).map((key)=>({
          label: TIMEPROTOCOLS[key],
          value: key,
        })).concat({
          label: "Custom",
          value: new RRule().toString()
        })}
        value={getRepeatOptions()}
      />
      {new RRule().toString() !== form.rrule.toString() || !Object.keys(TIMEPROTOCOLS).includes(form.rrule.toString()) && (
        <CustomRepeat rrule={form.rrule} setRRule={updateRRule} />
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
    marginHorizontal: margin.small,
  },
});

export default TimesForm;
