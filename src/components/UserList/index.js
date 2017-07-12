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
        <div className={b.container}>
          <h4>User List</h4>
          <div className={b.row}>
            {this.props.list.map(user => (
              <div className={b['col-sm-4']} key={user.id}>
                <div className={s.card} key={user.id}>
                  <Link className={s['card-link']} to={`/UserInfo/${user.id}`}>
                    <div className={s['card-img-cont']}>
                      <img className={s['card-img']} src="https://qph.ec.quoracdn.net/main-thumb-t-7187-200-WTlZyW922iBQFzeQKR99N4bZ4w44Drp2.jpeg" alt="hello" />
                    </div>
                    <p className={s['card-title']}>{user.title}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
