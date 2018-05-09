import React from 'react';
import {Link} from 'react-router-dom';

export default class TopMenuIsannoitsija extends React.Component {
  render() {
    return (
			<ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/admin_ilmoitukset">Ilmoitukset</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin_yhtiot">Yhtiöt</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin_henkilot">Henkilöt</Link>
        </li>
      </ul>
    );
  }
}
