/* @flow */

import type { Store as ReduxStore } from 'redux';

export type ArticlesLatestFetch = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};

export type ArticlesHotFetch = {
  readyStatus: string,
  err: any,
  list: Array<Object>,
};

export type ArtistsFeaturedFetch = {
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
  articlesLatestFetch: ArticlesLatestFetch,
  articlesLatestFetch: ArticlesHotFetch,
  artistsFeaturedFetch: ArtistsFeaturedFetch,
  articleInfo: ArticleInfo,
  router: any,
};

export type Action =
  { type: 'ARTICLES_LATEST_REQUESTING' } |
  { type: 'ARTICLES_LATEST_SUCCESS', data: Array<Object> } |
  { type: 'ARTICLES_LATEST_FAILURE', err: any } |
  { type: 'ARTICLES_HOT_REQUESTING' } |
  { type: 'ARTICLES_HOT_SUCCESS', data: Array<Object> } |
  { type: 'ARTICLES_HOT_FAILURE', err: any } |
  { type: 'ARTISTS_FEATURED_REQUESTING' } |
  { type: 'ARTISTS_FEATURED_SUCCESS', data: Array<Object> } |
  { type: 'ARTISTS_FEATUREDT_FAILURE', err: any } |
  { type: 'ARTICLE_REQUESTING', articleId: string } |
  { type: 'ARTICLE_SUCCESS', articleId: string, data: Object } |
  { type: 'ARTICLE_FAILURE', articleId: string, err: any };

export type Store = ReduxStore<Reducer, Action>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
