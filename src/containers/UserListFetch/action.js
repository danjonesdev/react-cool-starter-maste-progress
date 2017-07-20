/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const USERS_INVALID = 'USERS_INVALID';
export const USERS_REQUESTING = 'USERS_REQUESTING';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USERS_SUCCESS = 'USERS_SUCCESS';

export const API_URL = '/api/articleList';
//export const API_URL = 'https://api.myjson.com/bins/krm5r';

// Export this for unit testing more easily
export const fetchUsers = (indexLimit, axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: USERS_REQUESTING });
    return axios.get(URL, {
        params: {
          indexLimit: indexLimit
        }
      })
      .then((res) => {
        dispatch({ type: USERS_SUCCESS, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: USERS_FAILURE, err });
      });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchUsers = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const userListFetch = state.userListFetch;

  if (userListFetch.readyStatus === USERS_SUCCESS) return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchUsersIfNeeded = (indexLimit): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchUsers(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchUsers(indexLimit, axios));
    }

    /* istanbul ignore next */
    return null;
  };
