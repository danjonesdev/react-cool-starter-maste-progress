import reducer from '../reducer';
import {
  ARTICLES_LATEST_INVALID,
  ARTICLES_LATEST_REQUESTING,
  ARTICLES_LATEST_FAILURE,
  ARTICLES_LATEST_SUCCESS,
} from '../action';

describe('articles data reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      readyStatus: ARTICLES_LATEST_INVALID,
      err: null,
      list: [],
    });
  });

  test('should handle ARTICLES_LATEST_REQUESTING', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_LATEST_REQUESTING,
        err: null,
        data: [],
      }),
    ).toEqual({
      readyStatus: ARTICLES_LATEST_REQUESTING,
      err: null,
      list: [],
    });
  });

  test('should handle ARTICLES_LATEST_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_LATEST_FAILURE,
        err: 'Oops! Something went wrong.',
        data: [],
      }),
    ).toEqual({
      readyStatus: ARTICLES_LATEST_FAILURE,
      err: 'Oops! Something went wrong.',
      list: [],
    });
  });

  test('should handle ARTICLES_LATEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_LATEST_SUCCESS,
        err: null,
        data: [{ id: '1', name: 'Welly' }],
      }),
    ).toEqual({
      readyStatus: ARTICLES_LATEST_SUCCESS,
      err: null,
      list: [{ id: '1', name: 'Welly' }],
    });
  });
});
