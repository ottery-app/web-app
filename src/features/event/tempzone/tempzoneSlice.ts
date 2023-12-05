import { ChildRequestDto, requestType } from "@ottery/ottery-dto";
import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";

export interface tempzoneStore {
    requests: ChildRequestDto[],
}

const initialState: tempzoneStore = {
    requests: [],
}

const name = "tempzone";

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

    return function updateRequest(request:ChildRequestDto) {
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