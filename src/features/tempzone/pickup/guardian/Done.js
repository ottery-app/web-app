import { requestStatus } from "ottery-dto"
import { raft } from "../../../../assets/images/rafts"
import { Main } from "../../../../components/Main"
import ImageButton from "../../../../ottery-ui/buttons/ImageButton"
import Image from "../../../../ottery-ui/images/Image"
import { Title } from "../../../../ottery-ui/text/Title"

export function Done({form}) {
    let title = "Your kids all got off the raft. Have a great day!";

    for (let i = 0; i < form.requests.length; i++) {
        if (form.requests[i].status !== requestStatus.ACCEPTED) {
            title = "Looks like we had some trouble getting kids off the raft. Please reach out to a caretaker"
        }
    }

    return <Main>
        <Title>{title}</Title>
        <Image 
            src={raft}
            width={"100%"}
        />
        {form.requests.map(({child, status})=>{
            const state = (status === requestStatus.ACCEPTED) ? "success" : "error"; 

            return <ImageButton
                state={state}
                key={child._id}
                content={child.firstName}
                right={"pfp" && child.pfp.src}
            />
        })}
    </Main>
}