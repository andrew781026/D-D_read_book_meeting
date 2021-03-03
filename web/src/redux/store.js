import {combineReducers} from 'redux';
import ReduxEvent from './event/actionReducer';

export default combineReducers({
    event: ReduxEvent.Reducer,
});
