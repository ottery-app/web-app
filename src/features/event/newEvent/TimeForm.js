import styled from "styled-components";
import { margin } from "../../../ottery-ui/styles/margin";
import { useState,useEffect } from "react";
import OptionsInput from "../../../ottery-ui/input/OptionsInput";
import DateInput from "../../../ottery-ui/input/DateInput";
import TimeInput from "../../../ottery-ui/input/TimeInput";
import NumberInput from "../../../ottery-ui/input/NumberInput";
import { getDateName, getDay, getWeekInMonth } from "../../../functions/time";
import { setDate as setDateFields, formatTime, } from "../../../functions/time";
import { rruleToObj, rruleMonthlyByDayFrom, rruleMonthlyByWeekFrom, objToRrule } from "../../../functions/ical";
import RadioInputFields from "../../../ottery-ui/input/RadioInputFields";
import AbrCheckBoxInput from "../../../ottery-ui/input/AbrCheckBoxInput";
import {Main,Head, Form} from "./newEventStyles";
import {isDate, isRecurrence} from "@ottery/ottery-dto";

const TimeRow = styled.div`
    display: grid;
    width: 100%;
    gap: ${margin.small};
    justify-content: center;
    align-items: center;
    grid-template-columns: auto auto auto;
`;

const Row = styled.div`
    display: flex;
    gap: ${margin.small};
    width: 100%;
    justify-content: center;
    align-items: center;
`;

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

function CustomRepeat({
    date,
    custom,
    setCustom,
}) {
    //the time it repeats
    const [freq, setFreq] = useState()
    //the time between repeats
    const [interval, setInterval] = useState(rruleToObj(custom)['INTERVAL']||1);
    //The formatting for when the date should end
    const [end, setEnd] = useState();
    const [repeat, setRepeat] = useState();

    useEffect(()=>{
        if (freq==="DAILY"){
            setRepeat(undefined);
        } else if (freq === "WEEKLY") {
            if (!(repeat instanceof Array)){
                setRepeat([getDateName(date, true).substring(0,2)]);
            }
        } else if (freq === "MONTHLY") {
            if (!freq.includes('BYMONTHDAY') && !freq.includes("BYWEEKNO")){
                setRepeat(rruleMonthlyByWeekFrom(date));
            }
        } else if (freq === "YEARLY") {
            setRepeat(undefined);
        }
    }, [freq]);

    useEffect(()=>{
        const freq = rruleToObj(custom)['FREQ'];
        if (!freq || (freq !== "DAILY" && freq !== "MONTHLY" && freq !== "YEARLY" && freq !== "WEEKLY")) {
            setFreq("WEEKLY");
        }
        setFreq(freq);
    }, []);

    useEffect(()=>{
        const rrules = rruleToObj(custom);

        if(rrules["UNTIL"]){
            //till date
            setEnd(['UNTIL', rrules['UNTIL']]);
        } else if (rrules["COUNT"]){
            //occurences
            setEnd(['COUNT', rrules['COUNT']]);
        } else {
            //never end
            setEnd(['NEVER', undefined]);
        }
    }, []);

    useEffect(()=>{
        let rrule = {};

        if (freq) {
            rrule['FREQ'] = freq;
        }

        if (interval !== undefined) {
            rrule['INTERVAL'] = interval;
        }
        
        if (end) {
            if (end[0] !== 'NEVER'){
                rrule[end[0]] = end[1];
            }
        }

        if (repeat){
            if (repeat instanceof Array) {
                rrule["WKST"] = repeat;
            } else {
                rrule = {
                    ...rrule,
                    ...rruleToObj('RRULE:'+repeat),
                }
            }
        }

        //RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=8;WKST=SU;BYDAY=TU,TH
        console.log(end);
        if (!interval && !end &&  !repeat) {
            setCustom("RRULE:FREQ=CUSTOM");
        } else {
            setCustom(objToRrule(rrule));
        }
    }, [freq, interval, end, repeat]);

    return (
        <Main>
            <Head>Custom repeat</Head>
            <Form>
                <Row>
                    Every:
                    <NumberInput
                        min={1}
                        value={interval}
                        onChange={(e)=>setInterval(+e.target.value)}
                    />
                    <OptionsInput
                        value={freq}
                        options={[
                            ["DAILY", "day"],
                            ["WEEKLY", "week"],
                            ["MONTHLY", "month"],
                            ["YEARLY", "year"],
                        ]}
                        onChange={(e)=>setFreq(e.target.value)}
                    />
                </Row>
                {freq === "MONTHLY" && 
                    <Row>
                        <OptionsInput
                            label={"Occurs on..."}
                            value={repeat}
                            onChange={(e)=>{setRepeat(e.target.value)}}
                            options={[
                                [rruleMonthlyByDayFrom(date), `Monthly on day ${getDay(date)}`],
                                [rruleMonthlyByWeekFrom(date), `Monthly on the ${getWeekInMonth(date)} ${getDateName(date)}`],
                            ]}
                        />
                    </Row>
                }
                {freq === "WEEKLY" && 
                    <Row>
                        <AbrCheckBoxInput
                            onChange={(e)=>{
                                setRepeat(p=>{
                                    if (e.target.value && !p.includes(e.for)) {
                                        p.push(e.for);
                                    } else if (!e.target.value && p.includes(e.for)){
                                        p = p.filter(v=>v!==e.for);
                                    }

                                    return [...p];
                                });
                            }}
                            values={repeat}
                            options={[
                                ["SU", "s"],
                                ["MO", "m"],
                                ["TU", "t"],
                                ["WE", "w"],
                                ["TH", "t"],
                                ["FR", "f"],
                                ["SA", "s"],
                            ]}
                        />
                    </Row>
                }
                <Row>
                    <RadioInputFields
                        label="Ends:"
                        current={end && end[0]}
                        value={end && end[1]}
                        onChange={(e)=>{
                            if (e.for === "NEVER") {
                                setEnd(["NEVER", undefined]);
                            } else if (e.for === "UNTIL") {
                                setEnd(['UNTIL', e.target.value]);
                            } else if (e.for === "COUNT") {
                                setEnd(["COUNT", e.target.value]);
                            } else {
                                console.error("Something went wrong in setting end date");
                                setEnd(undefined);
                            }
                        }}
                        options={[
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
                                    placeholder: "occurances"
                                }
                            }
                        ]}
                    />
                </Row>
            </Form>
        </Main>
    );
}

export default function TimeForm({
    form,
    setForm,
    updateErrorHandler,
}) {
    //this is just to keep the color of the input gray before it has a value
    const [date, setDate] = useState(form.start);
    const [start, setStart] = useState(formatTime(form.start));
    const [end, setEnd] = useState(formatTime(form.end));
    const [repeat, setRepeat] = useState(form.recurrence[0]);

    useEffect(()=>{
        const unixStart = setDateFields(date, ...start.split(":"));

        const unixEnd = setDateFields(date, ...end.split(":"));

        updateErrorHandler(()=>{
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

        setForm((form)=>{
            return {
                ...form,
                start: unixStart,
                end: unixEnd,
                recurrence: [repeat],
            }
        });
    }, [date, start, end, repeat]);

    return (
        <Main>
            <Form>
                <Head>Time</Head>
                <DateInput
                    label="date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                />
                <TimeRow>
                    <TimeInput
                        label="start"
                        value={start}
                        onChange={(e)=>setStart(e.target.value)}
                    />
                    to
                    <TimeInput
                        label="end"
                        value={end}
                        onChange={(e)=>setEnd(e.target.value)}
                    />
                </TimeRow>
                <OptionsInput 
                    label="repeat"
                    value={repeat}
                    onChange={(e=>setRepeat(e.target.value))}
                    options={[
                        ...Object.entries(TIMEPROTOCOLS).map(([key, val])=>{
                            return [key.replaceAll("_", " "), val];
                        }),
                        [(repeat && !TIMEPROTOCOLS[repeat]) ? repeat : "CUSTOM", "Custom..."],
                    ]}
                />

                {((repeat && !TIMEPROTOCOLS[repeat]) || repeat==="CUSTOM") &&
                    <CustomRepeat date={date} custom={(()=>{
                        if (repeat==="CUSTOM"){
                            return "RRULE:FREQ=WEEKLY";
                        }

                        return repeat;
                    })()} setCustom={setRepeat} />
                }
            </Form>
        </Main>
    );
}