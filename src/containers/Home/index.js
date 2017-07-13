/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import UserListFetch from '../../containers/UserListFetch';
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

  renderUserList = () => {
    return <UserListFetch />;
  }

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderUserList()}
      </div>
    );
  }
}

export default Home;
