import { requestStatus } from "@ottery/ottery-dto";
import { raft } from "../../../../assets/images/rafts"
import { Main } from "../../../../components/Main"
import ImageButton from "../../../../ottery-ui/buttons/ImageButton"
import Image from "../../../../ottery-ui/images/Image"
import { Title } from "../../../../ottery-ui/text/Title"

export function Done({form}) {
    let title = "Your kids all got on the raft!";

    for (let i = 0; i < form.responces.length; i++) {
        if (form.responces[i].status === requestStatus.REJECTED) {
            title = "Oops, we ran into an issue!"
        }
    }

    return <Main>
        <Title>{title}</Title>
        <Image 
            src={raft}
            width={"200px"}
        />
        {form.responces.map(({child, status})=>{
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