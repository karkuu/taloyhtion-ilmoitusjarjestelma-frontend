import React from 'react';
import {Link} from 'react-router-dom';
import {getIlmoitustyyppiById} from '../../Helper.js';
import {notificationStatusText} from '../../Helper.js';

export default class EtuSivu extends React.Component {

  componentDidMount() {
    this.props.setPageTittle("Etusivu");
    this.props.getNotificationsByUid(this.props.loggedUser.id);
  }

  render() {

    let listView = [];
    if (this.props.notificationsList.length === 0) {
      {/* no notifications for the user */}
			listView = <tr><td colSpan="4"><p>Ei aktiivisia ilmoituksia. Haluatko <Link to="/ilmoituslomake">luoda uuden ilmoituksen</Link>?</p></td></tr>
		} else {

			listView = this.props.notificationsList.map((notification) =>
				<tr key={notification.id}>

					<td>
						<a href="/" data-toggle="modal" data-target={`#${notification.id}`}>{notification.title}</a>

            {/* Modal window for details */}
						<div className="modal fade" id={`${notification.id}`} tabIndex="-1" role="dialog" aria-labelledby={`${notification.name}`} aria-hidden="true">
						  <div className="modal-dialog" role="document" style={{maxWidth:'800px'}}>
						    <div className="modal-content">
						      <div className="modal-header">
						        <h5 className="modal-title" id={`${notification.id}`}>{notification.title}</h5>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div className="modal-body">
										<table className="table table-bordered">
											<tbody>
												<tr>
													<th>Ilmoitustyyppi</th>
													<td colSpan="3">{getIlmoitustyyppiById(notification.notif_type)}</td>
												</tr>
												<tr>
													<th colSpan="4">Kuvaus</th>
												</tr>
												<tr>
													<td colSpan="4">{notification.message}</td>
												</tr>
                        <tr>
													<th colSpan="4">Palaute</th>
												</tr>
                        <tr>
													<td colSpan="4">{notification.checkout_message}</td>
												</tr>
											</tbody>
										</table>
						      </div>
						      <div className="modal-footer">
						        <button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
						      </div>
						    </div>
						  </div>
						</div>

					</td>

					<td>
            <small>
            {new Date(notification.sent_date).toLocaleString("fi-FI")}
            </small>
          </td>
					<td>{getIlmoitustyyppiById(notification.notif_type)}</td>

					<td>
            {notificationStatusText(notification.status)}
          </td>

				</tr>
			)

		}


    return (
		<div className="card">
		  <div className="card-body">
		    <h3 className="card-title">Tervetuloa {this.props.loggedUser.first_name}</h3>
		    <p className="card-text mb-5">Viimeinen sisäänkirjautuminen {new Date(this.props.loggedUser.last_login).toLocaleString("fi-FI")}</p>

		    <h4>Omat ilmoitukset</h4>
  		  <table className="table table-bordered mb-5">
  		    <thead>
  		      <tr>
              <th>Ilmoitus</th>
              <th>Päivämäärä</th>
              <th>Tyyppi</th>
              <th>Status</th>
  		      </tr>
  		    </thead>
  		    <tbody>
            {listView}
  		    </tbody>
  		  </table>

  		  {/* <a href="tiedot.html" className="card-link"> */}
  		  <Link to="/tiedot" className="card-link">
  		  <img src="img/tiedot.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Omat tiedot</Link>
  		  {/* <a href="asetukset.html" className="card-link"> */}
  		  {/*<Link to="/asetukset" className="card-link">
  		  <img src="img/asetukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Asetukset</Link>*/}
  		  {/* <a href="ilmoituslomake.html" className="card-link"> */}
  		  <Link to="/ilmoituslomake" className="card-link">
  		  <img src="img/ilmoitukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/> Tee ilmoitus</Link>
		  </div>
		</div>
    );
  }
}
