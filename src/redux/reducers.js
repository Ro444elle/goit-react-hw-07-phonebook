import { combineReducers } from 'redux';
import contactReducer from './contactsSlice';

const rootReducer = combineReducers({
  contacts: contactReducer,
});

export default rootReducer;
