import { MainSignUp } from "./signUp.styles";
import Button from "../../../ottery-ui/buttons/Button";
import Faded from "../../../ottery-ui/text/Faded";
import { useState, useEffect } from "react";
import {getChildren} from "../../user/userApi";
import {useSelector} from "react-redux";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";
import { useLocation } from "react-router-dom";
import { Title } from "../../../ottery-ui/text/Title";
import { SelectChildren } from "../../../components/SelectChildren";
import { Main } from "../../../components/Main";

export function ChildSignUp({onDone, mainFlow}) {
    const userId = useSelector(store=>store.auth.sesh.userId);
    const [children, setChildren] = useState([]);
    const navigator = useNavigator();
    const {pathname} = useLocation();

    useEffect(()=>{
        getChildren(userId).then((res)=>{
            setChildren(res.data);
        })
    }, [userId]);

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