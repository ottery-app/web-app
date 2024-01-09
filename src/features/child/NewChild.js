import { gender } from "@ottery/ottery-dto";
import { Main } from "../../../ottery-ui/containers/Main";
import DateInput from "../../../ottery-ui/input/DateInput";
import { Dropdown } from "../../../ottery-ui/input/Dropdown";
import ImageInput from "../../../ottery-ui/input/ImageInput";
import TextInput from "../../../ottery-ui/input/TextInput";
import { useChildClient } from "./useChildClient";
import {useState} from "react";
import {View} from "react-native";
import { Text } from "react-native-paper";
import {Button} from "../../../ottery-ui/buttons/Button";
import { colors } from "../../../ottery-ui/styles/colors";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";
import { margin } from "../../../ottery-ui/styles/margin";
import { usePing } from "../../../ottery-ping";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";

export function NewChild() {
    const Ping = usePing();
    const createChild = useChildClient().useNewChild();
    const navigator = useNavigator();
    const [form, setForm] = useState({});

    function submit() {
        createChild.mutate(form, {
            onSuccess: (res)=>{
                if (res.error) {
                    Ping.error(res.error.message);
                } else {
                    navigator(paths.main.user.profile);
                }
            },
            onError: (res)=>{
                Ping.error(res.message);
            }
        })
    }

    return (
        <Main>
            <View style={{margin:margin.medium}}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <View style={{marginBottom:margin.medium}}>
                        <Text variant="titleLarge">Lets add one of your kids!</Text>
                    </View>
                    <ImageInput
                        value={form?.pfp}
                        onChange={(image)=>{setForm({...form, pfp:image})}}
                    />
                </View>
            </View>
            <TextInput
                label={"First name"}
                value={form?.firstName}
                onChange={(value)=>{setForm({...form, firstName:value})}}
            />
            <TextInput
                label={"Last name"}
                value={form?.lastName}
                onChange={(value)=>{setForm({...form, lastName:value})}}
            />
            <DateInput 
                label={"Birth date"}
                value={form?.dateOfBirth}
                onChange={(value)=>{setForm({...form, dateOfBirth: value})}}
            />
            <Dropdown
                label="Gender"
                value={form?.gender}
                options={Object.keys(gender).map((key)=>{return {label: gender[key], value: gender[key]}})}
                onChange={({value})=>{setForm({...form, gender:value})}}
            />
            <View style={{margin:margin.medium}}>
                <ButtonSpan>
                    <Button onPress={submit} color={colors.success} state={createChild.status}>Save</Button>
                </ButtonSpan>
            </View>
        </Main>
    );
}