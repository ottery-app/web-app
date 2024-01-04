import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import TimeInput, {
  TimeValueType,
} from "../../../../ottery-ui/input/TimeInput";
import Head from "./components/UI/Head";
import { StepProps } from "../../../../ottery-ui/forms/MultiStepForm";
import { EventFormData } from ".";
import DateInput from "../../../../ottery-ui/input/DateInput";
import { Main } from "../../../../ottery-ui/containers/Main";
import { Dropdown, DropdownOption } from "../../../../ottery-ui/input/Dropdown";
import CustomRepeat from "./components/CustomRepeat";
import { margin } from "../../../../ottery-ui/styles/margin";
import { RRule } from 'rrule'

// // Create a rule:
// const rule = new RRule({
//   freq: RRule.WEEKLY,
//   interval: 5,
//   byweekday: [RRule.MO, RRule.FR],
//   dtstart: new Date(),
//   until: new Date(new Date().getTime() + 10000000),
// })

// console.log(rule);
// console.log(rule.toString())

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
    const current = new Date(form.start);
    const target = new Date(value);
    current.setFullYear(target.getFullYear());
    current.setMonth(target.getMonth());
    current.setDate(target.getDate());
    form.start = current.getTime();
    setForm({...form})
  }

  /**
   * This function is used to update the time that the event starts in the day.
   */
  function handleStartChange(value: TimeValueType): void {
    const currentDate = new Date(form.start) || new Date();
    currentDate.setHours(value.hours);
    currentDate.setMinutes(value.minutes);
    form.start = currentDate.getTime();
    setForm({...form})
  }

  /**
   * This function is used to update the time that the event ends in the day.
   * @param value - An object containing hours and minutes for the new end time
   */
  function handleEndChange(endTime: TimeValueType): void {
    const end = new Date(form.start);
    end.setHours(endTime.hours);
    end.setMinutes(endTime.minutes);
    const start = new Date(form.start);
    form.durration = end.getTime() - start.getTime();
    setForm({...form});
  }

  /**
   * Function to get the date from an RRule object's dtstart property
   */
  function getDate(): number {
    return new Date(form.start).getTime();
  }

  /**
   * Function to get the start time from an RRule object's dtstart property
   */
  function getStart(): TimeValueType {
    const start = new Date(form.start);
    return {
      hours: start.getHours(),
      minutes: start.getMinutes(),
    };
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
    form.rrule = RRule.fromString(option.value);
    setForm({...form});
  }

  function getRepeatOptions() {
    // Get the RRULE string representation
    const ruleString = form.rrule.toString(); // This will give you a string representation of the rule

    // Extract just the RRULE part from the string
    const RRULEIndex = ruleString.indexOf('RRULE:');
    const RRULEString = RRULEIndex !== -1 ? ruleString.slice(RRULEIndex) : '';
    return RRULEString;
  }

  function updateRRule(rrule:RRule) {
    setForm({
      ...form,
      rrule: rrule,
    })
  }

  return (
    <>
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
        placeholder="Custom"
        options={Object.keys(TIMEPROTOCOLS).map((key)=>({
          label: TIMEPROTOCOLS[key],
          value: key,
        })).concat({
          label: "Custom",
          value: new RRule({ freq: RRule.DAILY, interval: 1 }).toString()
        })}
        value={getRepeatOptions()}
      />
      {!Object.keys(TIMEPROTOCOLS).includes(form.rrule.toString()) && (
        <CustomRepeat rrule={form.rrule} setRRule={updateRRule} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  timesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timesText: {
    marginHorizontal: margin.small,
  },
});

export default TimesForm;
