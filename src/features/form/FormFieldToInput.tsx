import { DataFieldDto } from "@ottery/ottery-dto";
import { InfoWrapper } from "../../../ottery-ui/input/InfoWrapper";
import { Input } from "../../../ottery-ui/input/Input";
//import { Text } from "react-native-paper";

export function FormFieldToInput({formField, value, onChange}) {
    return (
        <InfoWrapper
            header={formField.label}
            info={formField.note}
        >
            <Input 
                type={formField.type}
                label={formField.label}
                value={value?.value} 
                onChange={(val:any)=>{
                    value = value || {
                        formField: formField._id,
                        label: formField.label,
                        type: formField.type,
                        value: undefined,
                    } as DataFieldDto,

                    value.value = val;

                    onChange(value);
                }}
            />
            {/* {(formField.required) ? <Text style={{width:"100%", textAlign:'left'}}>required</Text> : undefined} */}
        </InfoWrapper>
    );
}