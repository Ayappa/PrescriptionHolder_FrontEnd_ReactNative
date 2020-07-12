import {combineReducers} from 'redux';
import prescriptionReducer from './prescriptionReducer';

export default combineReducers({
  prescriptions: prescriptionReducer,
});
