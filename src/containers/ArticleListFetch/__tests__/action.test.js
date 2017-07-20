import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import {
  fetchArticles,
  ARTICLES_REQUESTING,
  ARTICLES_FAILURE,
  ARTICLES_SUCCESS,
} from '../action';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch articles data', () => {
  const response = [{ id: '1', name: 'Welly' }];
  const errorMessage = 'Oops! Something went wrong.';

  afterEach(() => { nock.disableNetConnect(); });

  test('creates ARTICLES_SUCCESS when fetching articles has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: ARTICLES_REQUESTING },
      { type: ARTICLES_SUCCESS, data: response },
    ];
    const store = mockStore({ list: null });

    store.dispatch(fetchArticles(axios, `${host}/test`))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });

  test('creates ARTICLES_FAILURE when fail to fetch articles', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: ARTICLES_REQUESTING },
      { type: ARTICLES_FAILURE, err: new Error([errorMessage]) },
    ];
    const store = mockStore({ err: null });

    store.dispatch(fetchArticles(axios, `${host}/test`))
      .then(() => { expect(store.getActions()).toEqual(expectedActions); });
  });
});
