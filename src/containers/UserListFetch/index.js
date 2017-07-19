/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { UserListFetch as UserListFetchType, Dispatch, Reducer } from '../../types';
import UserList from '../../components/UserList';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  userListFetch: UserListFetchType,
  fetchUsersIfNeeded: () => void,
};

// Export this for unit testing more easily
export class UserListFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    userListFetch: {
      readyStatus: 'USERS_INVALID',
      list: null,
    },
    fetchUsersIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  renderUserList = () => {
    const { userListFetch } = this.props;

    if (!userListFetch.readyStatus || userListFetch.readyStatus === action.USERS_INVALID ||
      userListFetch.readyStatus === action.USERS_REQUESTING) {
      return <Loading />
    }

    if (userListFetch.readyStatus === action.USERS_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    return <UserList list={userListFetch.list} />;
  }

  render() {
    return (
      <div className={styles.UserListFetch}>
        {this.renderUserList()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ userListFetch }: Reducer) => ({ userListFetch }),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded()),
  }),
);

export default connector(UserListFetch);
