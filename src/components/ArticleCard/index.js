import React from 'react';

import styles from './styles.scss';

type Props = { info: Object };

const ArticleCard = ({ info }: Props) => (
  <div className={styles.ArticleCard}>
    <h4>Article Card</h4>
    <ul>
      <li>Name: {info.name}</li>
      <li>Phone: {info.phone}</li>
      <li>Email: {info.email}</li>
      <li>Website: {info.website}</li>
    </ul>
  </div>
);

ArticleCard.defaultProps = {
  info: {
    name: '',
    phone: '',
    email: '',
    website: '',
  },
};

export default ArticleCard;
