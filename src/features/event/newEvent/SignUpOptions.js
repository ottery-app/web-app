import {Main, Head, Form} from "./newEventStyles";
import AppendList from "../../../ottery-ui/lists/AppendList";
import {useState} from "react";
import CustomField from "./CustomField";
import { useEffect } from "react";
import Hint from "../../../ottery-ui/containers/Hint";
import { classifyWithDto, CustomFormFieldDto } from "@ottery/ottery-dto";

function makeHandleDone(setForm, listFieldName) {
    return function handleDone(list) {
        setForm((eventForm) => {
            eventForm[listFieldName] = [...list];
            return eventForm;
        });
    }
}

function SignUpOptions({
    fields=[],
    handleUpdate,
    updateErrorHandler,
}) {
    const [list, setList] = useState(fields);

    useEffect(()=>{
        updateErrorHandler(()=>{
            for (let i = 0; i < list.length; i++) {
                if (!classifyWithDto(CustomFormFieldDto, list[i])) {
                    return "All fields must be marked done.";
                }
            }
        });

        handleUpdate(list);
    }, [list]);

    return(
        <Main>
            <Form>
                <AppendList
                    onAdd={()=>setList(l=>[...l, {}])}
                    onDelete={(item)=>{
                        setList(list=>list.filter((trash,i)=>i !== +item.key));
                    }}
                >
                    {list.map((data, i)=>{
                        return <CustomField key={i} data={data} onDone={(update)=>{
                            list[list.indexOf(data)] = update;
                            setList([...list]);
                        }} />
                    })}
                </AppendList>
            </Form>
        </Main>
    );
}

function HelpWrap({title, children}) {
    return (
        <Form>
            <Head>{title}</Head>
            <Hint peak="Identification and emergency contacts are provided by default"/>
            {children}
        </Form>
    )
}

export function VolunteerSignUpOptions({
    form,
    setForm,
    updateErrorHandler
}) {
    return (
        <HelpWrap title="Volunteer Info">
            <SignUpOptions
                updateErrorHandler={updateErrorHandler}
                handleUpdate={makeHandleDone(setForm, "volenteerSignUp")}
                fields={form.volenteerSignUp}
            />
        </HelpWrap>
    );
}

export function AttendeeSignUpOptions({
    form,
    setForm,
    updateErrorHandler
}) {
    return (
        <HelpWrap title="Attendee Info">
            <SignUpOptions
                updateErrorHandler={updateErrorHandler}
                handleUpdate={makeHandleDone(setForm, "attendeeSignUp")}
                fields={form.attendeeSignUp}
            />
        </HelpWrap>
    );
}


