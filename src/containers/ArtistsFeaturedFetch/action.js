/* @flow */

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../types';

export const ARTISTS_FEATURED_INVALID = 'ARTISTS_FEATURED_INVALID';
export const ARTISTS_FEATURED_REQUESTING = 'ARTISTS_FEATURED_REQUESTING';
export const ARTISTS_FEATURED_FAILURE = 'ARTISTS_FEATURED_FAILURE';
export const ARTISTS_FEATURED_SUCCESS = 'ARTISTS_FEATURED_SUCCESS';

export const API_URL = '/api/articles';
//export const API_URL = 'https://api.myjson.com/bins/krm5r';

// Export this for unit testing more easily
export const fetchArtists = (indexLimit, axios: any, URL: string = API_URL): ThunkAction =>
  (dispatch: Dispatch) => {
    dispatch({ type: ARTISTS_FEATURED_REQUESTING });
    return axios.get(URL, {
        params: {
          indexLimit: indexLimit
        }
      })
      .then((res) => {
        dispatch({ type: ARTISTS_FEATURED_SUCCESS, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: ARTISTS_FEATURED_FAILURE, err });
      });
  };

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchArtists = (state: Reducer): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const artistsFeaturedFetch = state.artistsFeaturedFetch;

  if (artistsFeaturedFetch.readyStatus === ARTISTS_FEATURED_SUCCESS) return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchArtistsIfNeeded = (indexLimit): ThunkAction =>
  (dispatch: Dispatch, getState: GetState, axios: any) => {
    /* istanbul ignore next */
    if (shouldFetchArtists(getState())) {
      /* istanbul ignore next */
      return dispatch(fetchArtists(indexLimit, axios));
    }

    /* istanbul ignore next */
    return null;
  };
