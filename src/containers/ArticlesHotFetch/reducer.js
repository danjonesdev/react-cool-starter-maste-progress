/* @flow */

import _ from 'lodash';

import {
  ARTICLES_HOT_INVALID,
  ARTICLES_HOT_REQUESTING,
  ARTICLES_HOT_FAILURE,
  ARTICLES_HOT_SUCCESS,
} from './action';
import type { ArticlesHotFetch, Action } from '../../types';

type State = ArticlesHotFetch;

const initialState = {
  readyStatus: ARTICLES_HOT_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ARTICLES_HOT_REQUESTING:
      return _.assign({}, state, { readyStatus: ARTICLES_HOT_REQUESTING });
    case ARTICLES_HOT_FAILURE:
      return _.assign({}, state, {
        readyStatus: ARTICLES_HOT_FAILURE,
        err: action.err,
      });
    case ARTICLES_HOT_SUCCESS:
      return _.assign({}, state, {
        readyStatus: ARTICLES_HOT_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
