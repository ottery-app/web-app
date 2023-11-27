import { StyleSheet, View } from "react-native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Main } from "../../../../ottery-ui/containers/Main";
import { margin } from "../../../../ottery-ui/styles/margin";
import { CheckBox } from "../../../../ottery-ui/input/CheckBox";
import { Text } from "react-native-paper";
import Button from "../../../../ottery-ui/buttons/Button";
import { ButtonSpan } from "../../../../ottery-ui/containers/ButtonSpan";
import { BUTTON_TYPES } from "../../../../ottery-ui/buttons/button.enum";
import { useEventClient } from "../useEventClient";
import { useAuthClient } from "../../auth/useAuthClient";
import { usePing } from "../../../../ottery-ping";
import { useUserClient } from "../../user/useUserClient";
import Shadowbox from "../../../../ottery-ui/containers/Shadowbox";
import Image from "../../../../ottery-ui/image/Image";
import { happyCheck } from "../../../../assets/icons";
import { useNavigator } from "../../../router/useNavigator";
import paths from "../../../router/paths";

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
    }
});

enum pages {
    selectSignupTypes = "select",
    signupVolenteer = "volenteer",
    signupChildren = "child",
    done = "done",
}

export function SignUp({route}) {
    const [current, setCurrent] = useState(pages.selectSignupTypes);
    const [todo, setTodo] = useState([]);
    const [back, setBack] = useState([]);
    const [form, setForm] = useState({});

    const elements = useMemo(()=>{
        return {
            [pages.selectSignupTypes] : <SelectSignupTypes/>,
            [pages.signupChildren] : <SignupChildren/>,
            [pages.signupVolenteer] : <SignupVolenteer/>,
            [pages.done]: <Done/>,
        }
    }, []);

    function gotoNext(addPages=[]) {
        todo.push(...addPages);
        const last = todo.shift();
        setTodo([...todo])
        back.push(last);
        setBack([...back]);
        setCurrent(last);
    }

    function canGoBack() {
        return back.length > 0;
    }

    function goBack() {
        const next = back.pop();
        todo.unshift(next);
        setTodo([...todo]);
        setCurrent(next);
        setBack([...back]);
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
            {elements[current]}
        </SignupContext.Provider>
    );
}

function BackButton() {
    const {goBack, canGoBack} = useContext(SignupContext);

    if (canGoBack()) {
        return <Button onPress={goBack} styles={BUTTON_TYPES.outline}>Back</Button>
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
            gotoNext([pages.signupVolenteer]);
        } else if (type === "attendee") {
            gotoNext([pages.signupChildren]);
        }
    }, []);

    return (
        <Main style={styles.main}>
            <Text variant="headlineSmall">Lets get you signed up!</Text>
            <View style={styles.checkboxes}>
                <CheckBox label="Signing up kids?" value={attend} onChange={sA}></CheckBox>
                <CheckBox label="volenteering?" value={volenteer} onChange={sV}></CheckBox>
            </View>
            <ButtonSpan>
                <BackButton/>
                <Button onPress={()=>{
                    const options = [];
                    volenteer && options.push(pages.signupVolenteer);
                    attend && options.push(pages.signupChildren);
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

function SignupVolenteer() {
    //check for user data?
    const {route, gotoNext} = useContext(SignupContext);
    const userId = useAuthClient().useUserId();
    const eventRes = useEventClient().useGetEvent({inputs: [route.params.eventId]});
    const signup = useEventClient().useSignupUser();
    const Ping = usePing();
    const missingRes = useUserClient().useMissingUserData({
        inputs:[userId, eventRes?.data?.data?.volenteerSignUp],
        enabled: !!eventRes?.data?.data?.volenteerSignUp
    });
    const missingFields = missingRes?.data?.data;

    function signupNow() {
        signup.mutate(route.params.eventId, {
            onSuccess: ()=>{
                gotoNext([pages.done]);  
            },
            onError: (e:Error)=>{
                Ping.error(e.message);
            }
        })
    }

    useEffect(()=>{
        if (missingFields && missingFields.length === 0) {
            signupNow();
        }
    }, [missingFields])

    return <Main>
        <Text>TODO get missing data {JSON.stringify(missingFields)}</Text>
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