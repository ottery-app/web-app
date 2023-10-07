import { Main } from "../../../../components/Main";
import { QueueForm } from "../../../../ottery-ui/forms/QueueForm";
import { Select } from "./Select";
import { Done } from "./Done";
import { Await } from "./Await";

const dropOffs = {
    SELECTING: "selecting",
    AWAIT: "await",
    SUCCESS: "success",
}

export function PickUpGuardian() {
    return (
        <Main>
            <QueueForm
                //this is async so done can use the waiting wrapper
                onSubmit={async (form)=>{
                    console.log(form);
                }}
                initTodo={[dropOffs.SELECTING]}
                pages={[
                    {
                        key: dropOffs.SELECTING,
                        page: Select,
                        mainFlow: [dropOffs.AWAIT],
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
    );
}