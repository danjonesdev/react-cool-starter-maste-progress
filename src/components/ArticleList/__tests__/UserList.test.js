import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import ArticleList from '../index';

describe('<ArticleList />', () => {
  test('renders', () => {
    const mockData = [{ id: '1', name: 'Welly' }];
    const tree = renderer.create(
      <StaticRouter location={''} context={{}}>
        <ArticleList list={mockData} />
      </StaticRouter>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
