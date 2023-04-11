import OptionsInput from "../../../ottery-ui/input/OptionsInput";
import styled from "styled-components";
import { useState } from "react";
import { radius } from "../../../ottery-ui/styles/radius";
import { colors } from "../../../ottery-ui/styles/colors";
import { DATE } from "../../../ottery-ui/input/DateInput";
import { NUMBER } from "../../../ottery-ui/input/NumberInput";
import { TEXT } from "../../../ottery-ui/input/TextInput";
import { LongCheckboxInput } from "../../../ottery-ui/input/LongCheckboxInput";
import { EMAIL } from "../../../ottery-ui/input/EmailInput";
import {PHONE} from "../../../ottery-ui/input/PhoneInput";
import DatalistInput from "../../../ottery-ui/input/DatalistInput";
import { margin } from "../../../ottery-ui/styles/margin";
import Error from "../../../ottery-ui/text/Error";
import { useEffect } from "react";
import { classifyWithDto, CustomFormFieldDto } from "ottery-dto";
import { getAll } from "../../form/formApi";
import Button from "../../../ottery-ui/buttons/Button";
import EditButton from "../../../ottery-ui/buttons/actionButtons/EditButton";
import AreaInput from "../../../ottery-ui/input/AreaInput";

const Vertical = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    gap: ${margin.medium};
`

const Horizontal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items:center;
    gap: ${margin.medium};
`;

const INPUTS = [DATE, NUMBER, TEXT, PHONE, EMAIL];

export default function CustomField({
    data,
    onDone=()=>{}
}) {
    const [label, setLabel] = useState(data.label);
    const [type, setType] = useState(data.type);
    const [note, setNote] = useState(data.note);
    const [permanent, setPermanent] = useState(data.permanent);
    //setting this as true. This is returning a truth value and is only doing the 
    const [done, setDone] = useState(classifyWithDto(CustomFormFieldDto, data));
    const [error, setError] = useState();
    const [fields, setFields] = useState([]);

    useEffect(()=>{
        getAll()
            .then(res=>{
                setFields(res.data);
            })
    }, [])

    useEffect(()=>{
        setError("");
    }, [label, type]);

    function handleDone() {
        if (!label) { 
            setError("Label field can not be empty");
            return;
        }

        if (!type) {
            setError("Type field can not be empty");
            return;
        }

        const data = {
            label,
            type,
            optional: false,
            note,
            permanent,
        };
        onDone(data);
        setDone(true);
    }

    if (done) {
        return(
            <Horizontal>
                <EditButton
                    onClick={()=>setDone(false)}
                />
                <div>
                    {label}
                </div>
            </Horizontal>
        );
    } else {
        return (
            <>
                <Vertical>
                    <DatalistInput
                        label="Label"
                        placeholder="Name of the field"
                        value={label}
                        options={fields.map((formFieldDto)=>formFieldDto.label)}
                        onChange={(e)=>{
                            for (let i = 0; i < fields.length; i++) {
                                if (fields[i].label === e.target.value) {
                                    setLabel(fields[i].label);
                                    setType(fields[i].type);
                                    setNote(fields[i].note);
                                    setPermanent(fields[i].permanent);
                                    return;
                                }
                            }


                            setLabel(e.target.value)
                        }}
                    />
                    <OptionsInput
                        value = {type}
                        options={INPUTS}
                        label="Type"
                        onChange={(e)=>{setType(e.target.value)}}
                    />
                    <AreaInput
                        value = {note}
                        label="Leave a note why you want this field"
                        onChange={(e)=>{setNote(e.target.value)}}
                    />
                    <LongCheckboxInput
                        checked={permanent}
                        onChange={(e)=>{setPermanent(e.target.value)}}
                    >Mark as permanent</LongCheckboxInput>
                    <Button
                        onClick={handleDone}
                        radius={radius.default}
                        primaryColor={colors.primarySuccess}
                    >Save field</Button>
                </Vertical>
                <Error>{error}</Error>
            </>
        );
    }
}