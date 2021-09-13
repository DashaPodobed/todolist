import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/login/authReducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as string,
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null }>){
           // @ts-ignore
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const {setAppErrorAC, setAppStatusAC, setIsInitializedAC} = slice.actions

export const appReducer = slice.reducer

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
    })
        .finally(()=>{
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}