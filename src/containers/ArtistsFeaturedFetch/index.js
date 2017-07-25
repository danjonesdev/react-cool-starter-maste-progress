/* eslint-disable react/sort-comp */
/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';

import * as action from './action';
import type { ArtistsFeaturedFetch as ArtistsFeaturedFetchType, Dispatch, Reducer } from '../../types';
import ArtistsFeatured from '../../components/ArtistsFeatured';
import Loading from '../../containers/Loading';
import styles from './styles.scss';

type Props = {
  artistsFeaturedFetch: ArtistsFeaturedFetchType,
  fetchArtistsIfNeeded: (indexLimit: string) => void,
};

// Export this for unit testing more easily
export class ArtistsFeaturedFetch extends PureComponent {
  props: Props;

  static defaultProps: {
    artistsFeaturedFetch: {
      readyStatus: 'ARTISTS_FEATURED_INVALID',
      list: null,
    },
    fetchArtistsIfNeeded: () => {},
  };

  componentDidMount() {
    this.props.fetchArtistsIfNeeded(this.props.indexLimit);
  }

  renderArtistsFeatured = () => {

    const { artistsFeaturedFetch } = this.props;

    if (!artistsFeaturedFetch.readyStatus || artistsFeaturedFetch.readyStatus === action.ARTISTS_FEATURED_INVALID ||
      artistsFeaturedFetch.readyStatus === action.ARTISTS_FEATURED_REQUESTING) {
      return <Loading />
    }

    if (artistsFeaturedFetch.readyStatus === action.ARTISTS_FEATURED_FAILURE) {
      return <p>Oops, Failed to load list!</p>;
    }

    if (this.props.type === "square-small") {
        return <ArtistsFeatured list={artistsFeaturedFetch.list} />;
    }

    if (this.props.type === "square-featured") {
        return <ArtistsFeatured list={artistsFeaturedFetch.list} />;
    }
  }

  render() {
    return (
      <div className={styles.ArtistsFeatured}>
        {this.renderArtistsFeatured()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ artistsFeaturedFetch }: Reducer) => ({ artistsFeaturedFetch }),
  (dispatch: Dispatch) => ({
    fetchArtistsIfNeeded: (indexLimit: string) => dispatch(action.fetchArtistsIfNeeded(indexLimit)),
  }),
);

export default connector(ArtistsFeaturedFetch);
