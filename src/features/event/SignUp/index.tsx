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
import SelectionButton from "../../../../ottery-ui/buttons/SelectionButton";
import { ImageButtonList } from "../../../../ottery-ui/containers/ImageButtonList";
import { ImageButton } from "../../../../ottery-ui/buttons/ImageButton";
import { BUTTON_STATES } from "../../../../ottery-ui/buttons/button.enum";
import { useChildClient } from "../../child/useChildClient";
import { colors } from "../../../../ottery-ui/styles/colors";
import { image } from "../../../../ottery-ui/styles/image";
import { GetFormInfo } from "../../form/GetFormInfo";
import { GetBaseUserInfo } from "../../form/GetBaseUserInfo";

const SignupContext = createContext({
    gotoNext: undefined,
    goBack: undefined,
    form: undefined,
    setForm: undefined,
    canGoBack: undefined,
    route: undefined,
    current: undefined,
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
    selectChildren = "children",
    signupChildren = "child",
    signupUser = "user",
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
            [pages.selectChildren] : <SelectChildren/>,
            [pages.signupVolenteer] : <SignupVolenteer/>,
            [pages.signupUser] : <SignupUser />,
            [pages.done]: <Done/>,
        }
    }, []);

    function gotoNext(addPages:PageDto[] = []) {
        setCurrent((p)=>{
            todo.push(...addPages);
            const [current, ...todoTail] = todo;
            setTodo(todoTail);
            setBack([...back, p]);
            return current || {page: pages.done}
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
                current
            }}
        >
            {elements[current.page]}
        </SignupContext.Provider>
    );
}

function useBack() {
    const {goBack, canGoBack} = useContext(SignupContext);

    if (canGoBack()) {
        return goBack
    } else {
        return ()=>{}
    }
}

function BackButton() {
    const {goBack, canGoBack} = useContext(SignupContext);

    if (canGoBack()) {
        return <Button state="error" onPress={goBack}>Back</Button>
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
            gotoNext([{page:pages.selectChildren}]);
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
                    attend && options.push({page:pages.selectChildren});
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

function SignupUser() {
    const {route, gotoNext} = useContext(SignupContext);
    const userId = useAuthClient().useUserId();
    const updateData = useUserClient().useUpdateUserData();
    const eventId = route.params.eventId;
    const Ping = usePing();
    const goBack = useBack();

    function next(val) {
        updateData.mutate({
            userId: userId,
            dataFields: Object.values(val),
        }, {
            onSuccess:()=>gotoNext(),
            onError:(e:Error)=>{
                Ping.error(e.message);
            }
        });
    }

    return <GetBaseUserInfo
        userId={userId}
        eventId={eventId}
        onNoneMissing={()=>gotoNext()}
        onDone={next}
        goBack={goBack}
    />
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
    const goBack = useBack();

    function signupNow(datafields) {
        function singupMutate() {
            signup.mutate(route.params.eventId, {
                onSuccess: ()=>{
                    gotoNext();  
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
            signupNow([]);
        }
    }, [missingFields]);

    if (signup.status === "loading") {
        return;
    }

    return <GetFormInfo
        title="Uh oh! Looks like we are missing some info for signing you up."
        formFields={missingFields}
        onDone={signupNow}
        onBack={goBack}
    />
}

function SignupChildren() {
    const Ping = usePing();
    const {current, gotoNext, route} = useContext(SignupContext);
    const eventClient = useEventClient();
    const eventRes = eventClient.useGetEvent({inputs: [route.params.eventId]});
    const missingRes = useChildClient().useMissingChildData({
        inputs:[current.props.childId, eventRes?.data?.data?.attendeeSignUp],
        enabled: !!eventRes?.data?.data?.attendeeSignUp
    });
    const missingFields = missingRes?.data?.data;
    const updateData = useChildClient().useUpdateChildData();
    const signup = eventClient.useSignupAttendee(); 
    const goBack = useBack();


    function signupNow(datafields) {
        function singupMutate() {
            signup.mutate({
                eventId: route.params.eventId,
                childId: current.props.childId,
            }, {
                onSuccess: ()=>{
                    gotoNext();  
                },
                onError: (e:Error)=>{
                    Ping.error(e.message);
                }
            });
        }

        if (missingFields.length) {
            updateData.mutate({
                childId: current.props.childId,
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
            signupNow([]);
        }
    }, [missingFields]);

    if (signup.status === "loading") {
        return;
    }

    return <GetFormInfo
        title={"Uh oh! Looks like we are missing some info for signing you up"}
        formFields={missingFields}
        onBack={goBack}
        onDone={signupNow}
    />
}

function SelectChildren() {
    const Ping = usePing();
    const userId = useAuthClient().useUserId();
    const childrenRes = useUserClient().useGetUserChildren({inputs:[userId]});
    const [selected, setSelected] = useState([]);
    const {gotoNext, route} = useContext(SignupContext);
    const children = childrenRes?.data?.data.filter((child)=>!child.events.includes(route.params.eventId));
    const navigator = useNavigator();

    function addKids() {
        if (selected.length === 0) {
            Ping.error("Please select a child");
            return;
        }

        gotoNext([
            {
                page: pages.signupUser
            },
            ...selected.map(id=>{
            const page: PageDto = {
                page: pages.signupChildren,
                props: {childId:id}
            }

            return page;
            })
        ]);
    }

    function newKid() {
        navigator(paths.main.child.new, {next: paths.main.event.signup, nextParams:{...route.params}});
    }


    return <Main style={{gap:margin.large, flex:1}}>
        <Text variant="titleLarge" style={styles.centeredText}>Select kids to signup!</Text>
        <SelectionButton
            itemCount={selected.length}
            itemTitle={["child", "children"]}
            onPress={newKid}
            buttonTitle="Add"
            buttonColor={colors.success}
        ></SelectionButton>
        <ImageButtonList>
            {children?.map((child)=>
                <ImageButton
                    state={(selected.includes(child._id))?BUTTON_STATES.success:undefined}
                    right={child.pfp}
                    onPress={()=>{setSelected((selected)=>{
                        const filteredSelected = selected.filter(id=>id!==child._id);

                        if (filteredSelected.length === selected.length) {
                            return [...filteredSelected, child._id]
                        } else {
                            return filteredSelected;
                        }
                    })}}
                >
                    <Text>{child.firstName} {child.lastName}</Text>
                </ImageButton>
            )}
        </ImageButtonList>
        <ButtonSpan>
            <BackButton/>
            <Button
                onPress={addKids}
            >Done</Button>
        </ButtonSpan>
    </Main>
}

function Done() {
    const navigator = useNavigator();

    return <Main>
        <Shadowbox>
            <Text variant={"headlineSmall"} style={{textAlign:"center"}}>You are all signed up!</Text>
            <View style={{justifyContent:"center", alignItems:"center", padding:margin.large}}>
                <Image
                    src={happyCheck}
                    alt={"checkmark"}
                    width={image.largeProfile}
                />
            </View>
            <ButtonSpan>
                <Button
                    onPress={()=>{navigator(paths.main.home)}}
                >Done</Button>
            </ButtonSpan>
        </Shadowbox>
    </Main>
}