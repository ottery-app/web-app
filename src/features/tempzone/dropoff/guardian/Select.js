import { Main } from "../../../../components/Main";
import Faded from "../../../../ottery-ui/text/Faded";
import { SelectChildren } from "../../../../components/SelectChildren";
import {Title} from "../../../../ottery-ui/text/Title";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useUserClient } from "../../../user/useUserClient";

export function Select({onDone, mainFlow}) {
    const {useUserId} = useAuthClient();
    const userId = useUserId();
    const {useGetAvalableChildren} = useUserClient();
    const {data} = useGetAvalableChildren({inputs:[userId]});
    const children = data?.data || [];

    return (
        <Main>
            <Title>Select children to drop off</Title>
            <SelectChildren
                onDone={(children)=>{
                    onDone(mainFlow, {children:[...children]})
                }}
                children={children}
                htmlForNone={<Faded>You don't have any children to drop off</Faded>}
            />
        </Main>
    );
}