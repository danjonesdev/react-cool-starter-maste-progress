import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

import ArticleCard from '../index';

describe('<ArticleCard />', () => {
  test('renders', () => {
    const mockData = {
      name: 'Welly',
      phone: '007',
      email: 'test@gmail.com',
      website: 'www.test.com',
    };
    const tree = renderer.create(
      <StaticRouter location={''} context={{}}>
        <ArticleCard info={mockData} />
      </StaticRouter>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
