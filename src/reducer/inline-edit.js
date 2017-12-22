
import {o} from "atp-sugar";

//Action names
export const OPEN = "atp-inline-edit/activate";
export const CLOSE = "atp-inline-edit/close";

//Reducer
const initialState = {activeControl: null};
export default (state = initialState, action) =>
    o(action.type).switch({
        [OPEN]: () => o(state).merge({activeControl: action.key}).raw,
        [CLOSE]: () => o(state).merge({activeControl: null}).raw,
        default: () => state
    });

//Action creators
export const open = key => ({type: OPEN, key});
export const close = key => ({type: CLOSE, key});

//Selectors
export const isOpen = (state, key) => state.inlineEdit.activeControl === key;