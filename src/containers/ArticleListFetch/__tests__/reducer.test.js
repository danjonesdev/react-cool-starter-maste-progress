import reducer from '../reducer';
import {
  ARTICLES_INVALID,
  ARTICLES_REQUESTING,
  ARTICLES_FAILURE,
  ARTICLES_SUCCESS,
} from '../action';

describe('articles data reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      readyStatus: ARTICLES_INVALID,
      err: null,
      list: [],
    });
  });

  test('should handle ARTICLES_REQUESTING', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_REQUESTING,
        err: null,
        data: [],
      }),
    ).toEqual({
      readyStatus: ARTICLES_REQUESTING,
      err: null,
      list: [],
    });
  });

  test('should handle ARTICLES_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_FAILURE,
        err: 'Oops! Something went wrong.',
        data: [],
      }),
    ).toEqual({
      readyStatus: ARTICLES_FAILURE,
      err: 'Oops! Something went wrong.',
      list: [],
    });
  });

  test('should handle ARTICLES_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: ARTICLES_SUCCESS,
        err: null,
        data: [{ id: '1', name: 'Welly' }],
      }),
    ).toEqual({
      readyStatus: ARTICLES_SUCCESS,
      err: null,
      list: [{ id: '1', name: 'Welly' }],
    });
  });
});
