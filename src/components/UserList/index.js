import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import b from '../../theme/bootstrap-grid.min.css';
import s from './styles.scss';

type Props = { list: Object };

export class UserList extends PureComponent {
  props: Props;

  static defaultProps: {
    UserList: {
      test: null,
    }
  };

  render() {
    return (
    <div className={s.UserList}>
      <h4>Popular this week</h4>
      <div className={s.grid}>
        {this.props.list.map(user => (
            <div key={user.id} className={s.col}>
              <Link to={`/UserInfo/${user.id}`}>
                <div className={s.card}>
                  <div className={s.img}>
                    <img src="https://qph.ec.quoracdn.net/main-thumb-t-7187-200-WTlZyW922iBQFzeQKR99N4bZ4w44Drp2.jpeg" alt="" />
                  </div>
                  <p className={s.title}>{user.title}</p>
                  </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
    );
  }
}

UserList.defaultProps = {
  list: {
    id: '',
    title: '',
  },
};

export default UserList;
