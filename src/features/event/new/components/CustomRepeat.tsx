import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import {
  objToRrule,
  rruleMonthlyByDayFrom,
  rruleMonthlyByWeekFrom,
  rruleToObj,
} from "../../../../functions/ical";
import {
  getDateName,
  getDay,
  getWeekInMonth,
} from "../../../../functions/time";
import Main from "./UI/Main";
import Head from "./UI/Head";
import Row from "./UI/Row";
import NumericInput from "../../../../../ottery-ui/input/NumericInput";
import {
  Dropdown,
  DropdownOption,
} from "../../../../../ottery-ui/input/Dropdown";
import AbrCheckboxGroup from "../../../../../ottery-ui/controls/AbrCheckboxGroup";
import HybridRadioGroup, {
  HybridOptionProp,
} from "../../../../../ottery-ui/controls/HybridRadioGroup";

const FREQUENCY_OPTIONS = [
  { label: "day", value: "DAILY" },
  { label: "week", value: "WEEKLY" },
  { label: "month", value: "MONTHLY" },
  { label: "year", value: "YEARLY" },
];

const WEEKLY_REPEAT_OPTIONS = [
  {
    index: 0,
    label: "s",
    value: "SU",
  },
  {
    index: 1,
    label: "m",
    value: "MO",
  },
  {
    index: 2,
    label: "t",
    value: "TU",
  },
  {
    index: 3,
    label: "w",
    value: "WE",
  },
  {
    index: 4,
    label: "t",
    value: "TH",
  },
  {
    index: 5,
    label: "f",
    value: "FR",
  },
  {
    index: 6,
    label: "s",
    value: "SA",
  },
];

const CUSTOM_REPEAT_OPTIONS: HybridOptionProp[] = [
  {
    label: "Never",
    key: "NEVER",
  },
  {
    label: "On",
    key: "UNTIL",
    type: "date",
  },
  {
    label: "After",
    key: "COUNT",
    type: "number",
    props: {
      min: 1,
      placeholder: "repeats",
    },
  },
];

interface CustomRepeatProps {
  date: number;
  custom: string;
  setCustom: React.Dispatch<React.SetStateAction<string>>;
}

function CustomRepeat({ date, custom, setCustom }: CustomRepeatProps) {
  //the time it repeats
  const [freq, setFreq] = useState<string>();
  //the time between repeats
  const [interval, setInterval] = useState<number>(
    rruleToObj(custom)["INTERVAL"] || 1
  );
  //The formatting for when the date should end
  const [end, setEnd] = useState<[string, any]>([
    CUSTOM_REPEAT_OPTIONS[0].key,
    undefined,
  ]);
  const [repeat, setRepeat] = useState<string | string[] | undefined>(
    undefined
  );

  const monthlyRepeatOptions = useMemo(() => {
    return [
      {
        label: `Monthly on day ${getDay(date)}`,
        value: rruleMonthlyByDayFrom(date),
      },
      {
        label: `Monthly on the ${getWeekInMonth(date)} ${getDateName(date)}`,
        value: rruleMonthlyByWeekFrom(date),
      },
    ];
  }, [date]);

  useEffect(() => {
    const freq = rruleToObj(custom)["FREQ"];
    if (
      !freq ||
      (freq !== "DAILY" &&
        freq !== "MONTHLY" &&
        freq !== "YEARLY" &&
        freq !== "WEEKLY")
    ) {
      setFreq("WEEKLY");
    }
    setFreq(freq);
  }, []);

  useEffect(() => {
    const rrules = rruleToObj(custom);

    if (rrules["UNTIL"]) {
      //till date
      setEnd(["UNTIL", rrules["UNTIL"]]);
    } else if (rrules["COUNT"]) {
      //occurences
      setEnd(["COUNT", rrules["COUNT"]]);
    } else {
      //never end
      setEnd(["NEVER", undefined]);
    }
  }, []);

  useEffect(() => {
    if (freq === "DAILY") {
      setRepeat(undefined);
    } else if (freq === "WEEKLY") {
      if (!(repeat instanceof Array)) {
        setRepeat([getDateName(date, true).substring(0, 2)]);
      }
    } else if (freq === "MONTHLY") {
      if (!freq.includes("BYMONTHDAY") && !freq.includes("BYWEEKNO")) {
        setRepeat(rruleMonthlyByWeekFrom(date));
      }
    } else if (freq === "YEARLY") {
      setRepeat(undefined);
    }
  }, [freq]);

  useEffect(() => {
    let rrule = {};

    if (freq) {
      rrule["FREQ"] = freq;
    }

    if (interval !== undefined) {
      rrule["INTERVAL"] = interval;
    }

    if (end) {
      if (end[0] !== "NEVER") {
        rrule[end[0]] = end[1];
      }
    }

    if (repeat) {
      if (repeat instanceof Array) {
        rrule["WKST"] = repeat;
      } else {
        rrule = {
          ...rrule,
          ...rruleToObj("RRULE:" + repeat),
        };
      }
    }

    //RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=8;WKST=SU;BYDAY=TU,TH
    if (!interval && !end && !repeat) {
      setCustom("RRULE:FREQ=CUSTOM");
    } else {
      setCustom(objToRrule(rrule));
    }
  }, [freq, interval, end, repeat]);

  const selectedIndexes = useMemo(() => {
    if (repeat === undefined) {
      return [];
    } else if (repeat instanceof Array) {
      return WEEKLY_REPEAT_OPTIONS.filter((option) =>
        repeat.includes(option.value)
      ).map((option) => option.index);
    } else if (typeof repeat === "string") {
      return WEEKLY_REPEAT_OPTIONS.filter(
        (option) => option.value === repeat
      ).map((option) => option.index);
    }
  }, [JSON.stringify(repeat)]);

  function handleIntervalChange(newValue?: number) {
    setInterval(newValue);
  }

  function handleFrequencyChange({ value: freq }: DropdownOption) {
    setFreq(freq);
  }

  function handleMonthlyRepeatChange({ value: repeat }: DropdownOption) {
    setRepeat(repeat);
  }

  function handleWeeklyRepeatChange(value: string[]) {
    setRepeat(value);
  }

  function handleEndChange(key: string, value: any) {
    setEnd([key, value]);
  }

  return (
    <Main>
      <Head style={{ textAlign: "left" }}>Custom repeat</Head>
      <Row>
        <Text>Every: </Text>
        <View style={{ flex: 1 }}>
          <NumericInput
            min={1}
            onChange={handleIntervalChange}
            value={interval}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="Frequency"
            onChange={handleFrequencyChange}
            options={FREQUENCY_OPTIONS}
            value={freq}
          />
        </View>
      </Row>
      {freq === "MONTHLY" && (
        <Row>
          <Dropdown
            label="Occurs on..."
            onChange={handleMonthlyRepeatChange}
            options={monthlyRepeatOptions}
            value={repeat}
          />
        </Row>
      )}
      {freq === "WEEKLY" && (
        <AbrCheckboxGroup
          onChange={handleWeeklyRepeatChange}
          options={WEEKLY_REPEAT_OPTIONS}
          selectedIndexes={selectedIndexes}
        />
      )}
      <Row>
        <HybridRadioGroup
          label="Ends:"
          onChange={handleEndChange}
          options={CUSTOM_REPEAT_OPTIONS}
          selectedKey={end[0]}
          selectedValue={end[1]}
        />
      </Row>
    </Main>
  );
}

export default CustomRepeat;
