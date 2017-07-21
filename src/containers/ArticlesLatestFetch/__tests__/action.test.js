import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import {
  fetchArticles,
  ARTICLES_LATEST_REQUESTING,
  ARTICLES_LATEST_FAILURE,
  ARTICLES_LATEST_SUCCESS,
} from '../action';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch articles data', () => {
  const response = [{ id: '1', name: 'Welly' }];
  const errorMessage = 'Oops! Something went wrong.';

  afterEach(() => { nock.disableNetConnect(); });

  test('creates ARTICLES_LATEST_SUCCESS when fetching articles has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: ARTICLES_LATEST_REQUESTING },
      { type: ARTICLES_LATEST_SUCCESS, data: response },
    ];
    const store = mockStore({ list: null });

    store.dispatch(fetchArticles(axios, `${host}/test`))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });

  test('creates ARTICLES_LATEST_FAILURE when fail to fetch articles', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: ARTICLES_LATEST_REQUESTING },
      { type: ARTICLES_LATEST_FAILURE, err: new Error([errorMessage]) },
    ];
    const store = mockStore({ err: null });

    store.dispatch(fetchArticles(axios, `${host}/test`))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });
});
