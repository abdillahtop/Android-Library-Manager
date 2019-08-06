import { combineReducers } from 'redux';

import book from './book';
import Users from './users'
import loaning from './loaning'

const appReducer = combineReducers({
    book,
    Users,
    loaning
});

export default appReducer;