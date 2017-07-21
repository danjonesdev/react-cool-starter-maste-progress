/* @flow */

import _ from 'lodash';

import {
  ARTICLES_LATEST_INVALID,
  ARTICLES_LATEST_REQUESTING,
  ARTICLES_LATEST_FAILURE,
  ARTICLES_LATEST_SUCCESS,
} from './action';
import type { ArticlesLatestFetch, Action } from '../../types';

type State = ArticlesLatestFetch;

const initialState = {
  readyStatus: ARTICLES_LATEST_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ARTICLES_LATEST_REQUESTING:
      return _.assign({}, state, { readyStatus: ARTICLES_LATEST_REQUESTING });
    case ARTICLES_LATEST_FAILURE:
      return _.assign({}, state, {
        readyStatus: ARTICLES_LATEST_FAILURE,
        err: action.err,
      });
    case ARTICLES_LATEST_SUCCESS:
      return _.assign({}, state, {
        readyStatus: ARTICLES_LATEST_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
