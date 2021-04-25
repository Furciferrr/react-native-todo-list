import React, { useReducer } from "react";
import { CHANGE_SCREEN } from "../types";
import { ScreenContext } from "./screenContext";
import { initialState, screenReducer } from "./screenReducer";

export const ScreenState: React.FC<any> = ({children}) => {
    const [state, dispatch] = useReducer(screenReducer, initialState);
    const changeScreen = ( id: string )=> dispatch({type: CHANGE_SCREEN, payload: id})
    return <ScreenContext.Provider value={{
        changeScreen, todoId: state
    }}>{children}</ScreenContext.Provider>

}