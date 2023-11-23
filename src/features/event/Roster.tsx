import { TAB_BUTTON_TYPES } from "../../../ottery-ui/buttons/button.enum";
import TabField from "../../../ottery-ui/buttons/tabs/TabField";
import { Main } from "../../../ottery-ui/containers/Main";
import * as React from "react";

enum RosterTabs {
    caretakers = "caretakers",
    attendees = "attendees",
}

export function Roster() {
    const [tab, setTab] = React.useState();

    return (
        <Main>
            <TabField
                type={TAB_BUTTON_TYPES.upright}
                active={tab}
                tabs={Object.values(RosterTabs)}
                onTab={(tab)=>{setTab(tab)}}
            />
        </Main>
    );
}