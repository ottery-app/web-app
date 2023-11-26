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
    selectSignupTypes,
    signupVolenteer,
    signupChildren,
    done,
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
            [pages.done]: "done",
        }
    }, []);

    function gotoNext(addPages=[]) {
        todo.push(...addPages);
        setTodo([...todo])
        const last = todo.shift();
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
    const {gotoNext} = useContext(SignupContext);
    const Ping = usePing();
    const [volenteer, sV] = useState(false);
    const [attend, sA] = useState(false);

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
                    ((volenteer || attend) && gotoNext(options)) || Ping.error("Select one");
                }}>Next</Button>
            </ButtonSpan>
        </Main>
    );
}

function SignupVolenteer() {
    //check for user data?
    const {route} = useContext(SignupContext);
    const userId = useAuthClient().useUserId();
    const signup = useEventClient().useSignupUser();

    useEffect(()=>{
        signup.mutate(route.params.eventId, {
            onSuccess: ()=>{
                console.log("done");
            },
            onError: ()=>{
                console.log("error");
            }
        })
    }, [])

    return <Main>

    </Main>
}

function SignupChildren() {
    return <Main>

    </Main>
}

function Done() {

}