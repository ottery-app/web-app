import { Main } from "../../../../components/Main";
import { useState } from "react";
import Faded from "../../../../ottery-ui/text/Faded";
import { SelectChildren } from "../../../../components/SelectChildren";
import {Title} from "../../../../ottery-ui/text/Title";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useUserClient } from "../../../user/useUserClient";
import { AwaitLoad } from "../../../../guards/AwaitLoad";

export function Select({onDone, mainFlow}) {
    const {useUserId} = useAuthClient();
    const userId = useUserId();
    const {useGetAvalableChildren} = useUserClient();
    const [children, setChildren] = useState([]);

    const {status} = useGetAvalableChildren({
        inputs:[userId],
        onSuccess: (res)=>setChildren(res.data)
    });

    return (
        <AwaitLoad status={status}>
            <Main>
                <Title>Select children to drop off</Title>
                <SelectChildren
                    onDone={(children)=>{
                        onDone(mainFlow, {children:[...children]})
                    }}
                    children={children}
                    setChildren={setChildren}
                    //later we can offer the search for event tool
                    htmlForNone={<Faded>You don't have any children to drop off</Faded>}
                />
            </Main>
        </AwaitLoad>
    );
}