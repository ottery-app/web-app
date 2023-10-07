import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// Define the initial state for the query slice
const initialState = [];

const QUERY_STATUS_SLICE_NAME = "query_status_slice";

// Create the query slice
const queryStatusSlice = createSlice({
  name: QUERY_STATUS_SLICE_NAME,
  initialState,
  reducers: {
    updateStatus(state, action) {
        const key = JSON.stringify(action.payload);
        const status = action.payload;
        let found = false;

        for (let i = 0; i < state.length; i++ ) {
            if (state[i].key === key) {
                state[i].status = status;
            }
        }

        if (found === false) {
            state.push({key, status})
        }
    },
    clearStatus(state) {
      state.length = 0;
    },
  },
});

export function useQueryStatus() {
    const dispatch = useDispatch();

    const store = useSelector(store=>store.queryStatus);

    function updateStatus(key, status) {
      for (let i = 0; i < store.length; i++) {
        if (store[i].key === key && store[status] === status) {
          return;
        }
      }

      //dispatch(queryStatusSlice.actions.updateStatus({key, status}));
    }

    function clearStatus() {
      dispatch(queryStatusSlice.actions.clearStatus());
    }

    return {
        status: store,
        updateStatus,
        clearStatus,
    } 
}

export default queryStatusSlice.reducer;