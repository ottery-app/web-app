import { AddGuardian } from "./AddKnownGuardian";
import { InviteGuardian } from "./InviteUnknownGuardian";
import {useState} from "react"

export default function AddGuardianRoot({route}) {
    const [invite, setInvite] = useState(false);

    if (invite) {
        return <InviteGuardian route={route} setInvite={setInvite}/>
    } else {
        return <AddGuardian route={route} setInvite={setInvite}/>
    }
    
}