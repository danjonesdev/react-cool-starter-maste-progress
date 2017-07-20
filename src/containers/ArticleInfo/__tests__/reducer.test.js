import reducer from '../reducer';
import {
  ARTICLE_REQUESTING,
  ARTICLE_FAILURE,
  ARTICLE_SUCCESS,
} from '../action';

describe('article data reducer', () => {
  test('should handle the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  test('should handle ARTICLE_REQUESTING', () => {
    expect(
      reducer(undefined, {
        type: ARTICLE_REQUESTING,
        articleId: '1',
      }),
    ).toEqual({ 1: { readyStatus: ARTICLE_REQUESTING } });
  });

  test('should handle ARTICLE_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: ARTICLE_FAILURE,
        articleId: '1',
        err: 'Oops! Something went wrong.',
      }),
    ).toEqual({
      1: {
        readyStatus: ARTICLE_FAILURE,
        err: 'Oops! Something went wrong.',
      },
    });
  });

  test('should handle ARTICLE_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: ARTICLE_SUCCESS,
        articleId: '1',
        data: {
          name: 'Welly',
          phone: '007',
          email: 'test@gmail.com',
          website: 'www.test.com',
        },
      }),
    ).toEqual({
      1: {
        readyStatus: ARTICLE_SUCCESS,
        info: {
          name: 'Welly',
          phone: '007',
          email: 'test@gmail.com',
          website: 'www.test.com',
        },
      },
    });
  });
});
