import React from 'react';
import {Link} from 'react-router-dom';

export default class TopMenuAsukas extends React.Component {
  render() {
    return (

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
		      <Link className="nav-link" to="/ilmoituslomake">Tee ilmoitus</Link>
		    </li>
      </ul>


    );
  }
}
