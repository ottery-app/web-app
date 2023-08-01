import Faded from "../../../ottery-ui/text/Faded";
import { useState, useEffect } from "react";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";
import { useLocation } from "react-router-dom";
import { Title } from "../../../ottery-ui/text/Title";
import { SelectChildren } from "../../../components/SelectChildren";
import { Main } from "../../../components/Main";
import Button from "../../../ottery-ui/buttons/Button";
import {useUserClient} from "../../user/useUserClient";
import {useAuthClient} from "../../auth/useAuthClient";

//throw new Error("working here");

export function ChildSignUp({onDone, mainFlow}) {
    const {useGetUserChildren} = useUserClient();
    const {useUserId} = useAuthClient();
    const userId = useUserId();
    const childrenRes = useGetUserChildren({inputs:[userId]});
    const [children, setChildren] = useState([]);
    const navigator = useNavigator();
    const {pathname} = useLocation();

    useEffect(()=>{
        if (childrenRes?.data?.data) {
            setChildren(childrenRes.data.data);
        }
    }, [childrenRes]);

    function navToAddChild() {
        navigator(paths.child.new, {next:pathname});
    }

    return(
        <Main>
            <Title>Select kids to sign up</Title>
            <SelectChildren
                children={children}
                setChildren={setChildren}
                onAdd={navToAddChild}
                onDone={(children)=>{
                    onDone(mainFlow, {
                        children: children,
                    });
                }}
                //later we can offer the search for event tool
                htmlForNone={
                    <Main>
                        <Faded>You do not have any registered children</Faded>
                        <Button
                            onClick={navToAddChild}
                        >Add children</Button>
                    </Main>
                }
            />
        </Main>
    );
}