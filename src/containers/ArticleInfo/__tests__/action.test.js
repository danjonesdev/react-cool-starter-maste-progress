import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import {
  fetchArticle,
  ARTICLE_REQUESTING,
  ARTICLE_FAILURE,
  ARTICLE_SUCCESS,
} from '../action';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch article data', () => {
  const articleId = 'test';
  const response = {
    name: 'Welly',
    phone: '007',
    email: 'test@gmail.com',
    website: 'www.test.com',
  };
  const errorMessage = 'Oops! Something went wrong.';

  afterEach(() => { nock.disableNetConnect(); });

  test('creates ARTICLE_SUCCESS when fetching article has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: ARTICLE_REQUESTING, articleId },
      { type: ARTICLE_SUCCESS, articleId, data: response },
    ];
    const store = mockStore({ info: null });

    store.dispatch(fetchArticle('test', axios, host))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });

  test('creates ARTICLE_FAILURE when fail to fetch article', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: ARTICLE_REQUESTING, articleId },
      { type: ARTICLE_FAILURE, articleId, err: new Error([errorMessage]) },
    ];
    const store = mockStore({ err: null });

    store.dispatch(fetchArticle('test', axios, host))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });
});
