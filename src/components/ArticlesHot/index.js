import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import b from '../../theme/bootstrap-grid.min.css';
import s from './styles.scss';

type Props = { list: Object };

export class ArticlesHot extends PureComponent {
  props: Props;

  static defaultProps: {
    ArticlesHot: {
      test: null,
    }
  };

  render() {
    return (
    <div className={s.ArticlesHot}>
      <h4>Popular this week</h4>
      <div className={s.grid}>
        {this.props.list.map(article => (
            <div key={article.id} className={s.collg}>
              <Link to={`/ArticleInfo/${article.id}`}>
                <div className={s.card}>
                  <div className={s.img}>
                    <img src="https://qph.ec.quoracdn.net/main-thumb-t-7187-200-WTlZyW922iBQFzeQKR99N4bZ4w44Drp2.jpeg" alt="" />
                  </div>
                  <p className={s.title}>{article.title}</p>
                  </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
    );
  }
}

ArticlesHot.defaultProps = {
  list: {
    id: '',
    title: '',
  },
};

export default ArticlesHot;
