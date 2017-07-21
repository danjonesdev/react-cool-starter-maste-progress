/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const ARTICLES_LATEST_INVALID = 'ARTICLES_LATEST_INVALID';
export const ARTICLES_LATEST_REQUESTING = 'ARTICLES_LATEST_REQUESTING';
export const ARTICLES_LATEST_FAILURE = 'ARTICLES_LATEST_FAILURE';
export const ARTICLES_LATEST_SUCCESS = 'ARTICLES_LATEST_SUCCESS';

export const API_URL = '/api/articlesLatest';
//export const API_URL = 'https://api.myjson.com/bins/krm5r';

// Export this for unit testing more easily
export const fetchArticles = (indexLimit, axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: ARTICLES_LATEST_REQUESTING });
    return axios.get(URL, {
        params: {
          indexLimit: indexLimit
        }
      })
      .then((res) => {
        dispatch({ type: ARTICLES_LATEST_SUCCESS, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: ARTICLES_LATEST_FAILURE, err });
      });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchArticles = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const articlesLatestFetch = state.articlesLatestFetch;

  if (articlesLatestFetch.readyStatus === ARTICLES_LATEST_SUCCESS) return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchArticlesIfNeeded = (indexLimit): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchArticles(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchArticles(indexLimit, axios));
    }

    /* istanbul ignore next */
    return null;
  };
