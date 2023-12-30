import { id } from "@ottery/ottery-dto";
import { GetFormInfo, GetFormInfoProps } from "./GetFormInfo";
import { useUserClient } from "../user/useUserClient";
import { useEventClient } from "../event/useEventClient";
import { useEffect } from "react";

interface GetBaseUserInfoProps {
    userId: id,
    eventId: id,
    onNoneMissing: ()=>void
    onDone?: (v)=>void
    goBack?: ()=>void
}

export function GetBaseUserInfo(props: GetBaseUserInfoProps) {
    const eventRes = useEventClient().useGetEvent({inputs: [props.eventId]});
    const userClient = useUserClient();
    const missingRes = userClient.useMissingUserData({
        inputs:[props.userId, eventRes?.data?.data?.guardianSignUp],
        enabled: !!eventRes?.data?.data?.guardianSignUp
    });

    useEffect(()=>{
        if (missingRes?.data?.data && missingRes?.data?.data.length === 0) {
            props.onNoneMissing();
        }
    }, [missingRes]);

    return <GetFormInfo
        title="We need some info about you"
        formFields={missingRes?.data?.data || []}
        onDone={props.onDone}
        onBack={props.goBack}
    />
}