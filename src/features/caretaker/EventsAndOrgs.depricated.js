import TabField from "../../ottery-ui/buttons/tabs/TabField";
import { colors } from "../../ottery-ui/styles/colors";
import { useState } from "react";
import UserEvents from "../event/UserEvents";
import Orgs from "../orgs/Orgs";
import styled from "styled-components";
import { margin } from "../../ottery-ui/styles/margin";
import { useParams } from "react-router-dom";

const Center = styled.div`
    margin-top: ${margin.medium};
    display: flex;
    justify-content: center;
    width: 100%;
`;

/**
 * @deprecated
 */
export default function EventsAndOrgs() {
    const [current, setCurrent] = useState("Events");
    const {userId} = useParams();

    return (
        <>
            <TabField
                type="hanging"
                tertiaryColor={colors.primaryDark}
                active={current}
                tabs={["Events","Orgs"]}
                onTab={setCurrent}
            />
            <Center>
                {(current === "Events")
                    ?<UserEvents userId={userId} />
                    :<Orgs/>
                }
            </Center>
        </>
    );
}