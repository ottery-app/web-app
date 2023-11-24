import { useQueryClient } from "react-query";
import { makeUseMutation } from "../../queryStatus/makeUseMutation";
import { inviteGuardianForChild } from "./inviteApi";


export function useInviteClient() {
    const queryClient = useQueryClient();

    const useInviteGuardianForChild = makeUseMutation({
        mutationFn: inviteGuardianForChild,
    })

    return {
        useInviteGuardianForChild,
    }
}