import { useQueryClient } from "react-query";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { acceptGuardianship, inviteGuardianForChild } from "./inviteApi";


export function useInviteClient() {
    const queryClient = useQueryClient();

    const useInviteGuardianForChild = makeUseMutation({
        mutationFn: inviteGuardianForChild,
    })

    const useAcceptGuardianship = makeUseMutation({
        mutationFn: acceptGuardianship,
    })

    return {
        useAcceptGuardianship,
        useInviteGuardianForChild,
    }
}