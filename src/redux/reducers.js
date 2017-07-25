/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import articlesLatestFetch from '../containers/ArticlesLatestFetch/reducer';
import articlesHotFetch from '../containers/ArticlesHotFetch/reducer';
import articleInfo from '../containers/ArticleInfo/reducer';

export default combineReducers({
  articlesLatestFetch,
  articlesHotFetch,
  articleInfo,
  router,
});
