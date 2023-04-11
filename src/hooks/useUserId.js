import { useSelector } from "react-redux";

export function useUserId() {
    return useSelector(store=>store.auth.sesh.userId);
}