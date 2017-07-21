/* @flow */

import _ from 'lodash';

import {
  ARTICLES_FEATURED_INVALID,
  ARTICLES_FEATURED_REQUESTING,
  ARTICLES_FEATURED_FAILURE,
  ARTICLES_FEATURED_SUCCESS,
} from './action';
import type { ArticlesFeaturedFetch, Action } from '../../types';

type State = ArticlesFeaturedFetch;

const initialState = {
  readyStatus: ARTICLES_FEATURED_INVALID,
  err: null,
  list: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ARTICLES_FEATURED_REQUESTING:
      return _.assign({}, state, { readyStatus: ARTICLES_FEATURED_REQUESTING });
    case ARTICLES_FEATURED_FAILURE:
      return _.assign({}, state, {
        readyStatus: ARTICLES_FEATURED_FAILURE,
        err: action.err,
      });
    case ARTICLES_FEATURED_SUCCESS:
      return _.assign({}, state, {
        readyStatus: ARTICLES_FEATURED_SUCCESS,
        list: action.data,
      });
    default:
      return state;
  }
};
