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
  fetchUsersIfNeeded: (indexLimit: string) => void,
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
    this.props.fetchUsersIfNeeded(this.props.indexLimit);
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

    if (this.props.type === "square-small") {
        return <UserList list={userListFetch.list} />;
    }

    if (this.props.type === "square-featured") {
        return <UserList list={userListFetch.list} />;
    }
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
    fetchUsersIfNeeded: (indexLimit: string) => dispatch(action.fetchUsersIfNeeded(indexLimit)),
  }),
);

export default connector(UserListFetch);
