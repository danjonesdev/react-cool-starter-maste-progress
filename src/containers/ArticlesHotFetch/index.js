/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { ArticlesHotFetch as ArticlesHotFetchType, Dispatch, Reducer } from '../../types';
import ArticlesHot from '../../components/ArticlesHot';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  articlesHotFetch: ArticlesHotFetchType,
  fetchArticlesIfNeeded: (indexLimit: string) => void,
};

// Export this for unit testing more easily
export class ArticlesHotFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    articlesHotFetch: {
      readyStatus: 'ARTICLES_HOT_INVALID',
      list: null,
    },
    fetchArticlesIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchArticlesIfNeeded(this.props.indexLimit);
  }

  renderArticlesHot = () => {
    const { articlesHotFetch } = this.props;

    if (!articlesHotFetch.readyStatus || articlesHotFetch.readyStatus === action.ARTICLES_HOT_INVALID ||
      articlesHotFetch.readyStatus === action.ARTICLES_HOT_REQUESTING) {
      return <Loading />
    }

    if (articlesHotFetch.readyStatus === action.ARTICLES_HOT_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (this.props.type === "square-small") {
        return <ArticlesHot list={articlesHotFetch.list} />;
    }

    if (this.props.type === "square-hot") {
        return <ArticlesHot list={articlesHotFetch.list} />;
    }
  }

  render() {
    return (
      <div className={styles.ArticlesHotFetch}>
        {this.renderArticlesHot()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ articlesHotFetch }: Reducer) => ({ articlesHotFetch }),
  (dispatch: Dispatch) => ({
    fetchArticlesIfNeeded: (indexLimit: string) => dispatch(action.fetchArticlesIfNeeded(indexLimit)),
  }),
);

export default connector(ArticlesHotFetch);
