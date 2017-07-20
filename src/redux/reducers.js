/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import articleListFetch from '../containers/ArticleListFetch/reducer';
import articleInfo from '../containers/ArticleInfo/reducer';

export default combineReducers({
  articleListFetch,
  articleInfo,
  router,
});
