import { useParams } from "react-router-dom";
import { Main } from "../../../components/Main";
import { useUserId } from "../../../hooks/useUserId";

export function Chat() {
    const {userId} = useParams();
    const selfId = useUserId();

    return <Main>
        
    </Main>
} 