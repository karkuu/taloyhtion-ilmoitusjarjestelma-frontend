import React from 'react';
import {Link} from 'react-router-dom';

import IsannoitsijaEtuSivuLista from './IsannoitsijaEtuSivuLista';

export default class EtuSivu extends React.Component {

	componentDidMount() {
		this.props.setPageTittle("Etusivu")

	}


  render() {
    return (
			<div className="card">
			  <div className="card-body">
			    <h3 className="card-title">Tervetuloa {this.props.loggedUser.first_name}</h3>
			    <p className="card-text mb-5">Edellinen sisäänkirjautuminen {new Date(this.props.loggedUser.last_login).toLocaleString("fi-FI")}</p>
			    <h4>Käsittelemättömät ilmoitukset</h4>
				  <table className="table table-bordered mb-5">
					<thead>
						<tr>
							<th>Ilmoitus</th>
              <th>Päivämäärä</th>
              <th>Ilmoittaja</th>
              <th>Ilmoitus</th>
							<th>Toiminnot</th>
						</tr>
						</thead>
						<IsannoitsijaEtuSivuLista notificationsList={this.props.notificationsList}
																			updateNotificationStatus={this.props.updateNotificationStatus}
																			updateNotification={this.props.updateNotification}
																			getNotificationsNew={this.props.getNotificationsNew}/>
						
				  </table>
				  <Link to="/admin_ilmoitukset" className="card-link">
				  <img src="img/ilmoitukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Kaikki ilmoitukset</Link>
				  <Link to="/tiedot" className="card-link">
				  <img src="img/tiedot.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Omat tiedot</Link>
				  <Link to="/asetukset" className="card-link">
				  <img src="img/asetukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Asetukset</Link>
			  </div>
			</div>
    );
  }
}
