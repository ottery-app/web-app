import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "./authApi";

const initialState = {
    sesh: {
        loggedin: false,
        activated: false,
    },
    currentEvent: null,
    loading: true,
    error: null,
}

export const load = createAsyncThunk(
    `auth/load`,
    async ()=> {
        const response = await AuthApi.load();
        return response.data;
    }
)

export const register = createAsyncThunk(
    `auth/register`,
    async(formdata)=> {
        const response = await AuthApi.register(formdata);
        return response.data;
    }
)

export const verify = createAsyncThunk(
    `auth/verify`,
    async (formdata) => {
        const response = await AuthApi.verify(formdata);
        return response.data;
    }
)

export const login = createAsyncThunk(
    `auth/login`,
    async (formdata) => {
        const response = await AuthApi.login(formdata);
        return response.data;
    }
)

export const logout = createAsyncThunk(
    `auth/logout`,
    async()=>{
        const response = await AuthApi.logout()
        return response.data;
    }
)

export const activate = createAsyncThunk(
    `auth/activate`,
    async (formdata)=>{
        const response = await AuthApi.activate(formdata);
        return response.data;
    }
)

export const switchState = createAsyncThunk(
    `auth/state/switch`,
    async (eventID)=>{
        const response = await AuthApi.switchState(eventID);
        return response.data;
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(load.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(load.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(register.fulfilled, (state, action)=> {
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(login.rejected, (state, action)=>{
                state.error = action.error;
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(logout.rejected, (state, action)=>{
                state.error = action.error;
            })
            .addCase(activate.fulfilled, (state, action)=>{
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(activate.rejected, (state, action)=>{
                state.error = action.error;
            })
            .addCase(switchState.fulfilled, (state, action)=>{
                state.error = null;
                state.sesh = action.payload;
            })
            .addCase(switchState.rejected, (state, action)=>{
                state.error = action.error;
            })
    }
})

export default authSlice.reducer