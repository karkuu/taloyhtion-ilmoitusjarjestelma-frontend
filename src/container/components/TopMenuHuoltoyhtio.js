import React from 'react';
import {Link} from 'react-router-dom';

export default class TopMenuHuoltoyhtio extends React.Component {
  render() {
    return (
			<ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <Link class="nav-link" to="/admin_ilmoitukset">Ilmoitukset</Link>
        </li>
      </ul>
    );
  }
}
