import * as types from '../constants/ActionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.TASK_EDITING:
            return action.task;

        default: return state;
    }
}

export default reducer;