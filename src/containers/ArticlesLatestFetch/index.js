/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { ArticlesLatestFetch as ArticlesLatestFetchType, Dispatch, Reducer } from '../../types';
import ArticlesLatest from '../../components/ArticlesLatest';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  articlesLatestFetch: ArticlesLatestFetchType,
  fetchArticlesIfNeeded: (indexLimit: string) => void,
};

// Export this for unit testing more easily
export class ArticlesLatestFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    articlesLatestFetch: {
      readyStatus: 'ARTICLES_LATEST_INVALID',
      list: null,
    },
    fetchArticlesIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchArticlesIfNeeded(this.props.indexLimit);
  }

  renderArticlesLatest = () => {
    const { articlesLatestFetch } = this.props;

    if (!articlesLatestFetch.readyStatus || articlesLatestFetch.readyStatus === action.ARTICLES_LATEST_INVALID ||
      articlesLatestFetch.readyStatus === action.ARTICLES_LATEST_REQUESTING) {
      return <Loading />
    }

    if (articlesLatestFetch.readyStatus === action.ARTICLES_LATEST_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (this.props.type === "square-small") {
        return <ArticlesLatest list={articlesLatestFetch.list} />;
    }

    if (this.props.type === "square-featured") {
        return <ArticlesLatest list={articlesLatestFetch.list} />;
    }
  }

  render() {
    return (
      <div className={styles.ArticlesLatestFetch}>
        {this.renderArticlesLatest()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ articlesLatestFetch }: Reducer) => ({ articlesLatestFetch }),
  (dispatch: Dispatch) => ({
    fetchArticlesIfNeeded: (indexLimit: string) => dispatch(action.fetchArticlesIfNeeded(indexLimit)),
  }),
);

export default connector(ArticlesLatestFetch);
