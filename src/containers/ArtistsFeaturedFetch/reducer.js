/* @flow */

import _ from 'lodash';

import {
  ARTISTS_FEATURED_INVALID,
  ARTISTS_FEATURED_REQUESTING,
  ARTISTS_FEATURED_FAILURE,
  ARTISTS_FEATURED_SUCCESS,
} from './action';
import type { ArtistsFeaturedFetch, Action } from '../../types';

type State = ArtistsFeaturedFetch;

const initialState = {
  readyStatus: ARTISTS_FEATURED_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ARTISTS_FEATURED_REQUESTING:
      return _.assign({}, state, { readyStatus: ARTISTS_FEATURED_REQUESTING });
    case ARTISTS_FEATURED_FAILURE:
      return _.assign({}, state, {
        readyStatus: ARTISTS_FEATURED_FAILURE,
        err: action.err,
      });
    case ARTISTS_FEATURED_SUCCESS:
      return _.assign({}, state, {
        readyStatus: ARTISTS_FEATURED_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
