import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  jobListReducer,
  jobDetailsReducer,
  jobDeleteReducer,
  jobCreateReducer,
  jobUpdateReducer,
} from './reducers/jobReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  applicationCreateReducer,
  applicationDetailsReducer,
  applicationListMyReducer,
  applicationListReducer,
  applicationStatusUpdateReducer,
} from './reducers/applicationReducers';

const reducers = {
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,
  jobDelete: jobDeleteReducer,
  jobCreate: jobCreateReducer,
  jobUpdate: jobUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  applicationCreate: applicationCreateReducer,
  applicationListMy: applicationListMyReducer,
  applicationDetails: applicationDetailsReducer,
  applicationList: applicationListReducer,
  applicationStatusUpdate: applicationStatusUpdateReducer,
};

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
