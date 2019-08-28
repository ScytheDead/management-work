import * as types from '../constants/ActionTypes';

const data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

const generateID = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

const reducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type) {
        case types.LIST_ALL: 
            return state;
        case types.SAVE_TASK: 
            if(!action.task.id){
                action.task.id = generateID();
                state.push(action.task);
            } else {
                index = state.findIndex(task => task.id === action.task.id);
                if(index !== -1){
                    state[index] = action.task;
                }
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.CHANGE_STATUS_TASK: 
            index = state.findIndex(task => task.id === action.id);
            if(index !== -1) {
                // let task = Object.assign({}, state[index]);  Cách 1
                // let task = {...state[index]};    Cách 2
                // task.status = !task.status;  Cách 2
                state[index] = {...state[index], status: !state[index].status};
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        case types.DELETE_TASK: 
            index = state.findIndex(task => task.id === action.id);
            if(index !== -1){
                state.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];

        default: return state;
    }
}

export default reducer;