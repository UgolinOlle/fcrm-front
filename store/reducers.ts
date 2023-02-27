import {combineReducers} from "redux";

import authReducer from './auth/reducers';
import userReducer from './user/reducers';
import projectReducer from './project/reducers';

export const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
});
