import { ChildRequestDto, requestType } from "@ottery/ottery-dto";
import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { useTempzoneClient } from "./tempzoneClient";

export interface tempzoneStore {
    requests: ChildRequestDto[],
}

const initialState: tempzoneStore = {
    requests: [],
}

const name = "tempzone";

/**
 * This is for staging requests only not for storing them
 */
export const tempzoneSlice = createSlice({
    name,
    initialState,
    reducers: {
        removeReqeuest: (store, payload)=>{
            store.requests = store.requests.filter(request=>request.child !== payload.payload)
        },
        updateRequest: (store, payload)=>{
            if (store.requests.map(request=>request.child).includes(payload.payload.child)) {
                store.requests = store.requests.filter((request)=>request.child !== payload.payload.child);
            }

            store.requests = [...store.requests, payload.payload];
        } 
    }
});

export function useUpdateRequest() {
    const dispatch = useDispatch();
    const updateRequestApi = useTempzoneClient().useMakeChildRequest();

    return async function updateRequest(request: ChildRequestDto) {
        dispatch(tempzoneSlice.actions.updateRequest(request));
    }   
}


export function useRemoveRequest() {
    const dispatch = useDispatch();

    return function removeRequest(childId) {
        dispatch(tempzoneSlice.actions.removeReqeuest(childId));
    }
}

export function useGetRequests(...filters) {
    const selector = (store)=>store.tempzone.requests;
    let requests = useSelector(selector);

    for (let filter of filters) {
        requests = requests.filter(filter);
    }

    return requests;
}

export default tempzoneSlice.reducer;