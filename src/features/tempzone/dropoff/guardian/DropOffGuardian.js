import { Main } from "../../../../components/Main";
import { QueueForm } from "../../../../ottery-ui/forms/QueueForm";
import { Select } from "./Select";
import { Done } from "./Done";
import { Await } from "./Await";
import { PickEvents } from "./PickEvents";

const dropOffs = {
    SELECTING: "selecting",
    AWAIT: "await",
    SUCCESS: "success",
    PICK_EVENT: "pickevent",
}

export function DropOffGuardian() {
    return <Main>
        <QueueForm
            initTodo={[dropOffs.SELECTING]}
            pages={[
                {
                    key: dropOffs.SELECTING,
                    page: Select,
                    mainFlow: [dropOffs.PICK_EVENT],
                },
                {
                    key: dropOffs.PICK_EVENT,
                    page: PickEvents,
                    mainFlow: [dropOffs.AWAIT],
                    subFlow: [dropOffs.PICK_EVENT],
                },
                {
                    key: dropOffs.AWAIT,
                    page: Await,
                    mainFlow: [dropOffs.SUCCESS],
                },
                {
                    key: dropOffs.SUCCESS,
                    page: Done,
                },
            ]}
        />
    </Main>
}