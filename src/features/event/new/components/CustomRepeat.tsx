import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Main } from "../../../../../ottery-ui/containers/Main";
import Head from "./UI/Head";
import Row from "./UI/Row";
import NumericInput from "../../../../../ottery-ui/input/NumericInput";
import {
  Dropdown,
  DropdownOption,
} from "../../../../../ottery-ui/input/Dropdown";
import AbrCheckboxGroup from "../../../../../ottery-ui/controls/AbrCheckboxGroup";
import {
  InputRadioOption, InputRadioGroup,
} from "../../../../../ottery-ui/controls/InputRadioGroup";
import { inputType } from "@ottery/ottery-dto";
import { ByWeekday, Frequency, RRule } from "rrule";
import { margin } from "../../../../../ottery-ui/styles/margin";

const FREQUENCY_OPTIONS = [
  { label: "day", value: Frequency.DAILY },
  { label: "week", value: Frequency.WEEKLY },
  { label: "month", value: Frequency.MONTHLY },
  { label: "year", value: Frequency.YEARLY },
];

const WEEKLY_REPEAT_OPTIONS = [
  {
    index: 0,
    label: "Sa",
    value: RRule.SU.weekday,
  },
  {
    index: 1,
    label: "Mo",
    value: RRule.MO.weekday,
  },
  {
    index: 2,
    label: "Tu",
    value: RRule.TU.weekday,
  },
  {
    index: 3,
    label: "We",
    value: RRule.WE.weekday,
  },
  {
    index: 4,
    label: "Th",
    value: RRule.TH.weekday,
  },
  {
    index: 5,
    label: "Fr",
    value: RRule.FR.weekday,
  },
  {
    index: 6,
    label: "Sa",
    value: RRule.SA.weekday,
  },
];

enum END_TYPES {
  Never="NEVER",
  On="UNTIL",
  After="COUNT",
}

const CUSTOM_REPEAT_OPTIONS: InputRadioOption[] = [
  {
    label: "never",
    key: END_TYPES.Never,
    type: undefined,
  },
  {
    label: "on",
    key: END_TYPES.On,
    type: inputType.DATE,
    props: {
      placeholder: "Date"
    }
  },
  {
    label: "after",
    key: END_TYPES.After,
    type: inputType.NUMBER,
    props: {
      min: 1,
      placeholder: "Occurances",
    },
  },
];

interface CustomRepeatProps {
  rrule: RRule;
  setRRule: (rrule: RRule)=>void;
}

function CustomRepeat({ rrule, setRRule }: CustomRepeatProps) {
  const [endKey, setEndKey] = useState(END_TYPES.Never);
  const [endValues, setEndValues] = useState({});
  const [rule, setRule] = useState({...rrule.origOptions});

  useEffect(()=>{
    if (rule.interval !== undefined) {
      console.log(rule);
      setRRule(new RRule(rule));
    }
  }, [rule]);

  function handleIntervalChange(interval: number) {
    rule.interval = interval;
    setRule({...rule})
  }

  function handleFrequencyChange(freq: DropdownOption) {
    rule.freq = freq.value;
    setRule({...rule})
  }

  function handleEndChange(key, value) {
    setEndKey(key);

    endValues[key] = value;

    if (key === END_TYPES.After) {
      //set rrule to end after a certain number of events
      rule.count = value;
      rule.until = undefined;
    } else if (key === END_TYPES.On) {
      //set rrule to end on a date
      rule.count = undefined;
      rule.until = new Date(value);
    } else if (key === END_TYPES.Never) {
      //set rrule to never end
      rule.count = undefined;
      rule.until = undefined;
    }

    setRule({...rule})
    setEndValues({...endValues});
  }

  function handleWeeklyRepeatChange(value: number[]) {
    rule.byweekday = WEEKLY_REPEAT_OPTIONS.reduce((arr, option)=>{
      value.includes(option.index) && arr.push(option.value);
      return arr;
    }, []);

    setRule({...rule})
  }

  function getSelectedIndexes() {
    const days = rule.byweekday as ByWeekday[] || []

    return days.reduce((arr, weekday)=>{
      WEEKLY_REPEAT_OPTIONS.forEach((option)=>{
        option.value === weekday && arr.push(option.index);
      });

      return arr;
    }, []) || [];
  }

  function getCurrentFrequency() {
    return rule.freq;
  }

  function getCurrentInterval() {
    return rule.interval;
  }

  return (
    <Main>
      <Head style={{ textAlign: "left" }}>Custom repeat</Head>
      <Row>
        <Text style={{ flex: 1 }}>Every: </Text>
        <View style={{ flex: 1 }}>
          <NumericInput
            min={1}
            onChange={handleIntervalChange}
            value={getCurrentInterval()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="Frequency"
            onChange={handleFrequencyChange}
            options={FREQUENCY_OPTIONS}
            value={getCurrentFrequency()}
          />
        </View>
      </Row>
      {/*IM NOT SURE IF THIS IS NEEDED????*/}
      {/* {rrule.options.freq === Frequency.MONTHLY && (
        <Row>
          <Dropdown
            label="Occurs on..."
            onChange={handleMonthlyRepeatChange}
            options={monthlyRepeatOptions}
            value={repeat}
          />
        </Row>
      )} */}
      {rule.freq === Frequency.WEEKLY && (
        <AbrCheckboxGroup
          onChange={handleWeeklyRepeatChange}
          options={WEEKLY_REPEAT_OPTIONS}
          selectedIndexes={getSelectedIndexes()}
        />
      )}
      <Row>
        <InputRadioGroup
          label="Ends"
          onChange={handleEndChange}
          options={CUSTOM_REPEAT_OPTIONS}
          selected={endKey}
          values={endValues}
        />
      </Row>
    </Main>
  );
}

export default CustomRepeat;
