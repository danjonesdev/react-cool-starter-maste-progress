/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import ArticlesLatestFetch from '../../containers/ArticlesLatestFetch';
import ArticlesHotFetch from '../../containers/ArticlesHotFetch';
import ArtistsFeaturedFetch from '../../containers/ArtistsFeaturedFetch';
import styles from './styles.scss';

type Props = {
  home: HomeType,
};

// Export this for unit testing more easily
export class Home extends PureComponent {
  props: Props;

  static defaultProps: {
    home: {
      test: null,
    }
  };


  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
          <ArticlesHotFetch indexLimit="2" type="square-small" />;
          <ArticlesLatestFetch indexLimit="12" type="square-small" />;
          <ArtistsFeaturedFetch indexLimit="8" type="square-small" />;
      </div>
    );
  }
}

export default Home;
