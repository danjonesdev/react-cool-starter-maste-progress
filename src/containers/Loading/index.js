import React from 'react';
import s from './styles.scss';

const Loading = () => (
<div>
  <div className={s.center}>
    <div className={s.preloader}></div>
  </div>
</div>
);

export default Loading;
