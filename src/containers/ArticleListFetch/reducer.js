/* @flow */

import _ from 'lodash';

import {
  ARTICLES_INVALID,
  ARTICLES_REQUESTING,
  ARTICLES_FAILURE,
  ARTICLES_SUCCESS,
} from './action';
import type { ArticleListFetch, Action } from '../../types';

type State = ArticleListFetch;

const initialState = {
  readyStatus: ARTICLES_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ARTICLES_REQUESTING:
      return _.assign({}, state, { readyStatus: ARTICLES_REQUESTING });
    case ARTICLES_FAILURE:
      return _.assign({}, state, {
        readyStatus: ARTICLES_FAILURE,
        err: action.err,
      });
    case ARTICLES_SUCCESS:
      return _.assign({}, state, {
        readyStatus: ARTICLES_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
