/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { ArticlesFeaturedFetch as ArticlesFeaturedFetchType, Dispatch, Reducer } from '../../types';
import ArticlesFeatured from '../../components/ArticlesFeatured';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  articlesFeaturedFetch: ArticlesFeaturedFetchType,
  fetchArticlesIfNeeded: (indexLimit: string) => void,
};

// Export this for unit testing more easily
export class ArticlesFeaturedFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    articlesFeaturedFetch: {
      readyStatus: 'ARTICLES_FEATURED_INVALID',
      list: null,
    },
    fetchArticlesIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchArticlesIfNeeded(this.props.indexLimit);
  }

  renderArticlesFeatured = () => {
    const { articlesFeaturedFetch } = this.props;

    if (!articlesFeaturedFetch.readyStatus || articlesFeaturedFetch.readyStatus === action.ARTICLES_FEATURED_INVALID ||
      articlesFeaturedFetch.readyStatus === action.ARTICLES_FEATURED_REQUESTING) {
      return <Loading />
    }

    if (articlesFeaturedFetch.readyStatus === action.ARTICLES_FEATURED_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (this.props.type === "square-small") {
        return <ArticlesFeatured list={articlesFeaturedFetch.list} />;
    }

    if (this.props.type === "square-featured") {
        return <ArticlesFeatured list={articlesFeaturedFetch.list} />;
    }
  }

  render() {
    return (
      <div className={styles.ArticlesFeaturedFetch}>
        {this.renderArticlesFeatured()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ articlesFeaturedFetch }: Reducer) => ({ articlesFeaturedFetch }),
  (dispatch: Dispatch) => ({
    fetchArticlesIfNeeded: (indexLimit: string) => dispatch(action.fetchArticlesIfNeeded(indexLimit)),
  }),
);

export default connector(ArticlesFeaturedFetch);
