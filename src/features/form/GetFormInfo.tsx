import { Text } from "react-native-paper";
import { Main } from "../../../ottery-ui/containers/Main";
import { Form } from "../../../ottery-ui/containers/Form";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../ottery-ui/buttons/Button";
import { StyleSheet } from "react-native";
import { DataFieldDto, FormFieldDto, id, inputType } from "@ottery/ottery-dto";
import { FormFieldToInput } from "./FormFieldToInput";
import { useState } from "react";

const styles = StyleSheet.create({
    title: {
        textAlign:"center",
    }
});

export interface GetFormInfoProps {
    title: string
    formFields: FormFieldDto[]
    onDone?: (dataFields)=>void,
    onBack?: ()=>void,
}

export function GetFormInfo(props: GetFormInfoProps) {
    const [datafields, setDataFields] = useState({});

    props.formFields.sort((a,b)=>{
        if (a.type === inputType.PICTURE) {
            return -1;
        } else if (b.type === inputType.PICTURE) {
            return 1;
        }
    })

    function updateDataField(dataField:DataFieldDto) {
        setDataFields((p)=>{
            return {
                ...p,
                [dataField.formField]: dataField
            }
        })
    }

    return <Main scrollable={true}>
        <Text variant="titleLarge" style={styles.title} >{props.title}</Text>
        <Form>
            {props.formFields?.map((f: FormFieldDto)=>{
                const formField = f as FormFieldDto & {_id:id} 
                const id = formField._id;
                return <FormFieldToInput formField={formField} value={datafields[id]} onChange={updateDataField}/>
            })}
        </Form>
        {props.onDone || props.onBack
            ? <ButtonSpan>
                {props.onBack ? <Button state="error" onPress={()=>props.onBack()}>Back</Button> : undefined}
                {props.onDone ? <Button onPress={()=>props.onDone(datafields)}>Done</Button> : undefined}
            </ButtonSpan>
            : undefined
        }
    </Main>
}

