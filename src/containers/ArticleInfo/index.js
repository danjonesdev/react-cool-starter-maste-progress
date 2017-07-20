/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import type { ArticleInfo as ArticleInfoType, Dispatch, Reducer } from '../../types';
import ArticleCard from '../../components/ArticleCard';
import styles from './styles.scss';

type Props = {
  articleInfo: ArticleInfoType,
  match: Object,
  fetchArticleIfNeeded: (id: string) => void,
};

// Export this for unit testing more easily
export class ArticleInfo extends PureComponent {
  props: Props;

  static defaultProps: {
    articleInfo: {},
    match: { params: { id: '' } },
    fetchArticleIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchArticleIfNeeded, match: { params } } = this.props;

    fetchArticleIfNeeded(params.id);
  }

  renderArticleCard = () => {
    const { articleInfo, match: { params } } = this.props;
    const articleInfoById = articleInfo[params.id];

    if (!articleInfoById || articleInfoById.readyStatus === action.ARTICLE_REQUESTING) {
      return <p>Loading...</p>;
    }

    if (articleInfoById.readyStatus === action.ARTICLE_FAILURE) {
      return <p>Oops, Failed to load info!</p>;
    }

    return <ArticleCard info={articleInfoById.info} />;
  }

  render() {
    return (
      <div className={styles.ArticleInfo}>
        <Helmet title="Article Info" />
        {this.renderArticleCard()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ articleInfo }: Reducer) => ({ articleInfo }),
  (dispatch: Dispatch) => ({
    fetchArticleIfNeeded: (id: string) => dispatch(action.fetchArticleIfNeeded(id)),
  }),
);

export default connector(ArticleInfo);
