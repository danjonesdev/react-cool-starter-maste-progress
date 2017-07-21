import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import ArticlesLatest from '../index';

describe('<ArticlesLatest />', () => {
  test('renders', () => {
    const mockData = [{ id: '1', name: 'Welly' }];
    const tree = renderer.create(
      <StaticRouter location={''} context={{}}>
        <ArticlesLatest list={mockData} />
      </StaticRouter>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
