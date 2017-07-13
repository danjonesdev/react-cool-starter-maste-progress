/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import userListFetch from '../containers/UserListFetch/reducer';
import userInfo from '../containers/UserInfo/reducer';

export default combineReducers({
  userListFetch,
  userInfo,
  router,
});
