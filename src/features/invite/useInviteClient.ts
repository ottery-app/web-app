import { useQueryClient } from "react-query";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { acceptGuardianship, inviteGuardianForChild, sendAttendeeInvite, sendCaretakerInvite } from "./inviteApi";


export function useInviteClient() {
    const queryClient = useQueryClient();

    const useInviteGuardianForChild = makeUseMutation({
        mutationFn: inviteGuardianForChild,
    })

    const useAcceptGuardianship = makeUseMutation({
        mutationFn: acceptGuardianship,
    })

    const useSendCaretakerInvite = makeUseMutation({
        mutationFn: async ({eventId, email}) => await sendCaretakerInvite(eventId, email),
    })

    const useSendAttendeeInvite = makeUseMutation({
        mutationFn: async ({eventId, email}) => await sendAttendeeInvite(eventId, email),
    })


    return {
        useSendAttendeeInvite,
        useSendCaretakerInvite,
        useAcceptGuardianship,
        useInviteGuardianForChild,
    }
}