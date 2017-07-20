import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import {
  ARTICLE_REQUESTING,
  ARTICLE_FAILURE,
  ARTICLE_SUCCESS,
} from '../action';
import { ArticleInfo } from '../index';

describe('<ArticleInfo />', () => {
  const tree = (props, actions) => renderer.create(
    <StaticRouter location={''} context={{}}>
      <ArticleInfo {...props} {...actions} />
    </StaticRouter>,
  ).toJSON();

  test('should call fetchArticleIfNeeded when componentDidMount', () => {
    const mockAction = jest.fn();
    const props = {
      articleInfo: {},
      match: { params: { id: 1 } },
    };
    const actions = { fetchArticleIfNeeded: mockAction };

    mount(
      <StaticRouter location={''} context={{}}>
        <ArticleInfo {...props} {...actions} />
      </StaticRouter>,
    );

    expect(mockAction).toHaveBeenCalled();
  });

  test('renders the loading status if data invalid', () => {
    const props = {
      articleInfo: {},
      match: { params: { id: 1 } },
    };
    const actions = { fetchArticleIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders the loading status if requesting data', () => {
    const props = {
      articleInfo: { 1: { readyStatus: ARTICLE_REQUESTING } },
      match: { params: { id: 1 } },
    };
    const actions = { fetchArticleIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders an error if loading failed', () => {
    const props = {
      articleInfo: { 1: { readyStatus: ARTICLE_FAILURE } },
      match: { params: { id: 1 } },
    };
    const actions = { fetchArticleIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders the <ArticleCard /> if loading was successful', () => {
    const props = {
      articleInfo: {
        1: {
          readyStatus: ARTICLE_SUCCESS,
          info: {
            name: 'Welly',
            phone: '007',
            email: 'test@gmail.com',
            website: 'www.test.com',
          },
        },
      },
      match: { params: { id: 1 } },
    };
    const actions = { fetchArticleIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
