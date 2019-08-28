import * as types from '../constants/ActionTypes';

const initialState = '';

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SEARCH: 
            return action.keyword;

        default: return state;
    }
}

export default reducer;