import { useEffect } from "react";
import { Main } from "../../../../components/Main";
import { useUserId } from "../../../../hooks/useUserId";
import { useState } from "react";
import Faded from "../../../../ottery-ui/text/Faded";
import { SelectChildren } from "../../../../components/SelectChildren";
import {Title} from "../../../../ottery-ui/text/Title";
import {getAvalableChildren} from "../../../user/userApi";

export function Select({onDone, mainFlow}) {
    const userId = useUserId();
    const [children, setChildren] = useState([]);
    
    useEffect(()=>{
        getAvalableChildren(userId).then((res)=>{
            setChildren(res.data);
        });
    }, []);

    return <Main>
        <Title>Select children to drop off</Title>
        <SelectChildren
            onDone={(children)=>{
                onDone(mainFlow, {children})
            }}
            children={children}
            setChildren={setChildren}
            //later we can offer the search for event tool
            htmlForNone={<Faded>You don't have any children to drop off</Faded>}
        />
    </Main>;
}