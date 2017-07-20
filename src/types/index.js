/* @flow */

import type { Store as ReduxStore } from 'redux';

export type ArticleListFetch = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};

export type ArticleInfo = {
  [articleId: string]: {
    readyStatus: string,
    err: any,
    info: Object,
  },
};

export type Reducer = {
  articleListFetch: ArticleListFetch,
  articleInfo: ArticleInfo,
  router: any,
};

export type Action =
  { type: 'ARTICLES_REQUESTING' } |
  { type: 'ARTICLES_SUCCESS', data: Array<Object> } |
  { type: 'ARTICLES_FAILURE', err: any } |
  { type: 'ARTICLE_REQUESTING', articleId: string } |
  { type: 'ARTICLE_SUCCESS', articleId: string, data: Object } |
  { type: 'ARTICLE_FAILURE', articleId: string, err: any };

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
