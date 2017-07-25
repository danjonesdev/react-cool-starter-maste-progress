import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import b from '../../theme/bootstrap-grid.min.css';
import s from './styles.scss';

type Props = { list: Object };

export class ArtistsFeatured extends PureComponent {
  props: Props;

  static defaultProps: {
    ArtistsFeatured: {
      test: null,
    }
  };

  render() {
    return (
    <div className={s.ArtistsFeatured}>
      <h4>Popular this week</h4>
      <div className={s.grid}>
        {this.props.list.map(artist => (
            <div key={artist.id} className={s.col}>
              <Link to={`/ArticleInfo/${artist.id}`}>
                <div className={s.card}>
                  <div className={s.img}>
                    <img src="https://qph.ec.quoracdn.net/main-thumb-t-7187-200-WTlZyW922iBQFzeQKR99N4bZ4w44Drp2.jpeg" alt="" />
                  </div>
                  <p className={s.title}>{artist.title}</p>
                  </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
    );
  }
}

ArtistsFeatured.defaultProps = {
  list: {
    id: '',
    title: '',
  },
};

export default ArtistsFeatured;
