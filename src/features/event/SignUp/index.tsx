import { StyleSheet, View } from "react-native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Main } from "../../../../ottery-ui/containers/Main";
import { margin } from "../../../../ottery-ui/styles/margin";
import { CheckBox } from "../../../../ottery-ui/input/CheckBox";
import { Text } from "react-native-paper";
import Button from "../../../../ottery-ui/buttons/Button";
import { ButtonSpan } from "../../../../ottery-ui/containers/ButtonSpan";
import { useEventClient } from "../useEventClient";
import { useAuthClient } from "../../auth/useAuthClient";
import { usePing } from "../../../../ottery-ping";
import { useUserClient } from "../../user/useUserClient";
import Shadowbox from "../../../../ottery-ui/containers/Shadowbox";
import Image from "../../../../ottery-ui/image/Image";
import { happyCheck } from "../../../../assets/icons";
import { useNavigator } from "../../../router/useNavigator";
import paths from "../../../router/paths";
import { Form } from "../../../../ottery-ui/containers/Form";
import { FormFieldDto, DataFieldDto } from "@ottery/ottery-dto";
import { InfoWrapper } from "../../../../ottery-ui/input/InfoWrapper";
import { Input } from "../../../../ottery-ui/input/Input";

const SignupContext = createContext({
    gotoNext: undefined,
    goBack: undefined,
    form: undefined,
    setForm: undefined,
    canGoBack: undefined,
    route: undefined,
});

const styles = StyleSheet.create({
    main: {
        width: '100%',
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: margin.large,
        paddingTop: margin.large,
    },
    checkboxes: {
        flex: 1,
        width: "100%",
        gap: margin.small,
    },
    formContainer: {
        flex:1,
        gap: margin.large,
        width: "100%",
    },
    centeredText: {
        textAlign: "center",
    }
});

enum pages {
    selectSignupTypes = "select",
    signupVolenteer = "volenteer",
    signupChildren = "child",
    done = "done",
}

interface PageDto {
    page: pages,
    props?: object,
}

export function SignUp({route}) {
    const Ping = usePing();
    const [current, setCurrent] = useState<PageDto>({page:pages.selectSignupTypes});
    const [todo, setTodo] = useState<PageDto[]>([]);
    const [back, setBack] = useState<PageDto[]>([]);
    const [form, setForm] = useState({});

    const elements = useMemo(()=>{
        return {
            [pages.selectSignupTypes] : <SelectSignupTypes/>,
            [pages.signupChildren] : <SignupChildren/>,
            [pages.signupVolenteer] : <SignupVolenteer/>,
            [pages.done]: <Done/>,
        }
    }, []);

    function gotoNext(addPages:PageDto[]) {
        setCurrent((p)=>{
            todo.push(...addPages);
            const [current, ...todoTail] = todo;
            setTodo(todoTail);
            setBack([...back, p]);
            return current
        })
    }

    function canGoBack() {
        return back.length > 0;
    }

    function goBack() {
        setCurrent((p)=>{
            setBack([]);
            return {page:pages.selectSignupTypes};
        })
    }

    return (
        <SignupContext.Provider
            value={{
                gotoNext,
                goBack,
                form,
                setForm,
                canGoBack,
                route,
            }}
        >
            {elements[current.page]}
        </SignupContext.Provider>
    );
}

function BackButton() {
    const {goBack, canGoBack} = useContext(SignupContext);

    if (canGoBack()) {
        return <Button onPress={goBack}>Back</Button>
    }
}

function SelectSignupTypes() {
    const {gotoNext, route} = useContext(SignupContext);
    const Ping = usePing();
    const [volenteer, sV] = useState(false);
    const [attend, sA] = useState(false);
    const type = route.params.type;

    useEffect(()=>{
        if (type === "caretaker") {
            gotoNext([{page: pages.signupVolenteer}]);
        } else if (type === "attendee") {
            gotoNext([{page:pages.signupChildren}]);
        }
    }, []);

    return (
        <Main style={styles.main}>
            <Text variant="headlineSmall">Lets get you signed up!</Text>
            <View style={styles.checkboxes}>
                <CheckBox label="Signing up kids?" value={attend} onChange={sA}/>
                <CheckBox label="Volenteering?" value={volenteer} onChange={sV}/>
            </View>
            <ButtonSpan>
                <BackButton/>
                <Button onPress={()=>{
                    const options = [];
                    volenteer && options.push({page:pages.signupVolenteer});
                    attend && options.push({page:pages.signupChildren});
                    if (options.length) {
                        gotoNext(options);
                    } else {
                        Ping.error("Select one");
                    }
                }}>Next</Button>
            </ButtonSpan>
        </Main>
    );
}

function FormFieldToInput({formField, value, onChange}) {
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
        </InfoWrapper>
    );
}

function SignupVolenteer() {
    //check for user data?
    const {route, gotoNext} = useContext(SignupContext);
    const userId = useAuthClient().useUserId();
    const eventRes = useEventClient().useGetEvent({inputs: [route.params.eventId]});
    const signup = useEventClient().useSignupUser();
    const Ping = usePing();
    const userClient = useUserClient();
    const missingRes = userClient.useMissingUserData({
        inputs:[userId, eventRes?.data?.data?.volenteerSignUp],
        enabled: !!eventRes?.data?.data?.volenteerSignUp
    });
    const updateData = userClient.useUpdateUserData();
    const missingFields = missingRes?.data?.data;
    const [datafields, setDataFields] = useState({});

    function updateDataField(dataField:DataFieldDto) {
        setDataFields((p)=>{
            return {
                ...p,
                [dataField.formField]: dataField
            }
        })
    }

    function signupNow() {
        function singupMutate() {
            signup.mutate(route.params.eventId, {
                onSuccess: ()=>{
                    gotoNext([{page:pages.done}]);  
                },
                onError: (e:Error)=>{
                    Ping.error(e.message);
                }
            });
        }

        if (missingFields.length) {
            updateData.mutate({
                userId: userId,
                dataFields: Object.values(datafields),
            }, {
                onSuccess:singupMutate,
                onError:(e:Error)=>{
                    Ping.error(e.message);
                }
            });
        } else {
            singupMutate();
        }
    }

    useEffect(()=>{
        if (missingFields && missingFields.length === 0) {
            signupNow();
        } else if (missingFields) {
            missingFields.map(missingField=>{
                setDataFields((p)=>{
                    return {
                        ...p,
                        [missingField._id]: {
                            formField: missingField._id,
                            label: missingField.label,
                            type: missingField.type,
                            value: undefined,
                        },
                    }
                })
            })
        }
    }, [missingFields]);
    
    if ([signup.status, updateData.status].find((v)=>v==="loading" || v ==="idle")) {
        return;
    }

    return <Main style={styles.formContainer}>
        <Text variant="titleLarge" style={styles.centeredText}>Uh oh! Looks like we are missing some info for signing you up.</Text>
        <Form>
            {missingFields?.map((formField)=><FormFieldToInput formField={formField} value={datafields[formField._id]} onChange={updateDataField}/>)}
        </Form>
        <ButtonSpan>
            <BackButton/>
            <Button
                onPress={signupNow}
            >Done</Button>
        </ButtonSpan>
    </Main>
}

function SignupChildren() {
    return <Main>
        children
    </Main>
}

function Done() {
    const navigator = useNavigator();

    return <Main>
        <Shadowbox>
            <Text variant={"headlineSmall"}>You are all signed up!</Text>
            <Image
                src={happyCheck}
                alt={"checkmark"}
                width={"100%"}
            />
            <ButtonSpan>
                <Button
                    onPress={()=>{navigator(paths.main.home)}}
                >Done</Button>
            </ButtonSpan>
        </Shadowbox>
    </Main>
}