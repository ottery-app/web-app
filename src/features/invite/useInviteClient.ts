import { useQueryClient } from "react-query";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { acceptGuardianship, inviteGuardianForChild, sendCaretakerInvite } from "./inviteApi";


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

    return {
        useSendCaretakerInvite,
        useAcceptGuardianship,
        useInviteGuardianForChild,
    }
}