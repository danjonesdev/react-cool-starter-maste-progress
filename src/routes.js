/* @flow */

import type { Dispatch } from './types';
import { fetchArticleIfNeeded } from './containers/ArticleInfo/action';
import HomePage from './containers/Home';
import ArticleInfoPage from './containers/ArticleInfo';
import NotFoundPage from './containers/NotFound';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,  // Add your route here
  },
  {
    path: '/ArticleInfo/:id',
    component: ArticleInfoPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchArticleIfNeeded(params.id)),
    ]),
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
