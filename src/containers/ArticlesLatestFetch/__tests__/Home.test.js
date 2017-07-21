import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import {
  ARTICLES_LATEST_INVALID,
  ARTICLES_LATEST_REQUESTING,
  ARTICLES_LATEST_FAILURE,
  ARTICLES_LATEST_SUCCESS,
} from '../action';
import { Home } from '../index';

describe('<Home />', () => {
  const tree = (props, actions) => renderer.create(
    <StaticRouter location={''} context={{}}>
      <Home {...props} {...actions} />
    </StaticRouter>,
  ).toJSON();

  test('should call fetchArticlesIfNeeded when componentDidMount', () => {
    const mockAction = jest.fn();
    const props = {
      home: {},
    };
    const actions = {
      fetchArticlesIfNeeded: mockAction,
    };

    mount(
      <StaticRouter location={''} context={{}}>
        <Home {...props} {...actions} />
      </StaticRouter>,
    );

    expect(mockAction).toHaveBeenCalled();
  });

  test('renders the loading status if data invalid', () => {
    const props = {
      home: { readyStatus: ARTICLES_LATEST_INVALID },
    };
    const actions = { fetchArticlesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders the loading status if requesting data', () => {
    const props = {
      home: { readyStatus: ARTICLES_LATEST_REQUESTING },
    };
    const actions = { fetchArticlesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders an error if loading failed', () => {
    const props = {
      home: { readyStatus: ARTICLES_LATEST_FAILURE },
    };
    const actions = { fetchArticlesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  test('renders the <ArticlesLatest /> if loading was successful', () => {
    const props = {
      home: {
        readyStatus: ARTICLES_LATEST_SUCCESS,
        list: [{ id: '1', name: 'Welly' }],
      },
    };
    const actions = { fetchArticlesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
