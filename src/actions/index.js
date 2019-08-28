import * as types from '../constants/ActionTypes';

export const listAll = () => ({ type: types.LIST_ALL });
export const saveTask = task => ({type: types.SAVE_TASK, task});
export const toggleForm = () => ({type: types.TOGGLE_FORM});
export const closeForm = () => ({type: types.CLOSE_FORM});
export const openForm = () => ({type: types.OPEN_FORM});
export const changeStatusTask = id => ({type: types.CHANGE_STATUS_TASK, id});
export const deleteTask = id => ({type: types.DELETE_TASK, id});
export const setTaskEditing = task => ({type: types.TASK_EDITING, task});
export const filterTask = (filter) => ({type: types.FILTER_TASK, filter});
export const searchTask = keyword => ({type: types.SEARCH, keyword});
export const sortTask = sort => ({type: types.SORT, sort});
