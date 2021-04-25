import { CHANGE_SCREEN } from "../types"


export const initialState = null

type InitialStateType = null | string

export const screenReducer = (state: InitialStateType, action: ActionType) => {
    switch (action.type) {
        case CHANGE_SCREEN: {
            return action.payload
        }
        default:
            return state  
    }
}

export const changeScreen = (id: string) => {
    return {
        type: CHANGE_SCREEN,
        payload: id
    }
}
type ActionType =  ReturnType<typeof changeScreen>

