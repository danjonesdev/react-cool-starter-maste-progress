/* @flow */

import type { Dispatch } from './types';
import { fetchUserIfNeeded } from './containers/UserInfo/action';
import HomePage from './containers/Home';
import UserInfoPage from './containers/UserInfo';
import NotFoundPage from './containers/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,  // Add your route here
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchUserIfNeeded(params.id)),
    ]),
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
