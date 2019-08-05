import { combineReducers } from 'redux';

import book from './book';
import Users from './users'

const appReducer = combineReducers({
    book,
    Users
});

export default appReducer;