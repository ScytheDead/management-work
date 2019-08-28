import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filter from './filterTask'
import keyword from './searchTask';
import sort from './sortTask';

const reducer = combineReducers({
    tasks,
    isDisplayForm,
    taskEditing,
    filter,
    keyword,
    sort
});

export default reducer