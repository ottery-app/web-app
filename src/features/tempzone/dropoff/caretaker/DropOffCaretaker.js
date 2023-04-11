import { Main } from "../../../../components/Main";
import { QueueForm } from "../../../../ottery-ui/forms/QueueForm";
import { Awaiting } from "./Awaiting";
import { Accept } from "./Accept";
import { Decline } from "./Decline";

const dropOffs = {
    AWAITING: "awaiting",
    ACCEPT: "accept",
    DECLINE: "decline",
}

export function DropOffCaretaker() {
    return <Main>
        <QueueForm
            initTodo={[dropOffs.AWAITING]}
            pages={[
                {
                    key: dropOffs.AWAITING,
                    page: Awaiting,
                    mainFlow: [dropOffs.ACCEPT],
                },
                {
                    key: dropOffs.ACCEPT,
                    page: Accept,
                    mainFlow: [dropOffs.AWAITING],
                    subFlow: [dropOffs.DECLINE],
                },
                {
                    key: dropOffs.DECLINE,
                    page: Decline,
                    mainFlow: [dropOffs.AWAITING],
                }
            ]}
        />
    </Main>
}