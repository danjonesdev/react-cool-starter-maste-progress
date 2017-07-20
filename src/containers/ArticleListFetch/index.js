/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { ArticleListFetch as ArticleListFetchType, Dispatch, Reducer } from '../../types';
import ArticleList from '../../components/ArticleList';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  articleListFetch: ArticleListFetchType,
  fetchArticlesIfNeeded: (indexLimit: string) => void,
};

// Export this for unit testing more easily
export class ArticleListFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    articleListFetch: {
      readyStatus: 'ARTICLES_INVALID',
      list: null,
    },
    fetchArticlesIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchArticlesIfNeeded(this.props.indexLimit);
  }

  renderArticleList = () => {
    const { articleListFetch } = this.props;

    if (!articleListFetch.readyStatus || articleListFetch.readyStatus === action.ARTICLES_INVALID ||
      articleListFetch.readyStatus === action.ARTICLES_REQUESTING) {
      return <Loading />
    }

    if (articleListFetch.readyStatus === action.ARTICLES_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (this.props.type === "square-small") {
        return <ArticleList list={articleListFetch.list} />;
    }

    if (this.props.type === "square-featured") {
        return <ArticleList list={articleListFetch.list} />;
    }
  }

  render() {
    return (
      <div className={styles.ArticleListFetch}>
        {this.renderArticleList()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ articleListFetch }: Reducer) => ({ articleListFetch }),
  (dispatch: Dispatch) => ({
    fetchArticlesIfNeeded: (indexLimit: string) => dispatch(action.fetchArticlesIfNeeded(indexLimit)),
  }),
);

export default connector(ArticleListFetch);
