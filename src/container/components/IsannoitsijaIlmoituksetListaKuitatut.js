import React from 'react';
import {getIlmoitustyyppiById} from '../../Helper.js';

export default class EtuSivu extends React.Component
{
	render() {

		let listView = [];

		if (this.props.checkedNotifications.length === 0) {
			listView = <tr><td colSpan="11"><p>Ei aktiivisia ilmoituksia</p></td></tr>
		} else {

			listView = this.props.checkedNotifications.map((notification) =>
				<tr key={notification.id}>

					<td>
						<a href="/" data-toggle="modal" data-target={`#${notification.id}`}>{notification.title}</a>

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
														<th>Talonyhtiö</th>
														<td>{notification.name}</td>
														<th>Huoneisto</th>
														<td>x</td>
													</tr>
													<tr>
														<th>Lähettäjä</th>
														<td colSpan="3">{notification.fullname}</td>
													</tr>
													<tr>
														<th>Osoite</th>
														<td>{notification.billing_address}</td>
														<th>Postinumero</th>
														<td>{notification.ub_zip}</td>
													</tr>
													<tr>
														<th>Postitoimipaikka</th>
														<td colSpan="3">{notification.ub_city}</td>
													</tr>
													<tr>
														<th>Puhelin</th>
														<td>{notification.phone}</td>
														<th>Sähköposti</th>
														<td>{notification.email}</td>
													</tr>
													<tr>
														<th colSpan="4">Kuvaus</th>
													</tr>
													<tr>
														<td colSpan="4">{notification.message}</td>
													</tr>
													<tr>
														<th colSpan="4">Kommentti</th>
													</tr>
													<tr>
														<td colSpan="4">{notification.checkout_message}</td>
													</tr>
												</tbody>
											</table>

											<form>
												<label htmlFor="statusChange">Muuta tilaa:</label>
												<a href="/"><img src="img/vastaanotettu.svg" className="img-fluid" alt="[H]" width="20" height="20" /></a>
												<a href="/"><img src="img/tyonalla.svg" className="img-fluid" alt="[H]" width="20" height="20" /></a>
												<a href="/"><img src="img/keskeytynyt.svg" className="img-fluid" alt="[H]" width="20" height="20" /></a>
											</form>

							      </div>
							      <div className="modal-footer">
							        <button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
							        <button type="button" className="btn btn-primary">Tallenna</button>
							      </div>
							    </div>
							  </div>
							</div>

					</td>

					<td><small>
						{new Date(notification.sent_date).toLocaleString("fi-FI")}
						</small>
					</td>
					<td colSpan="3">{notification.fullname}</td>
					<td colSpan="3">{getIlmoitustyyppiById(notification.notif_type)}</td>
					<td>{notification.id_checkout}</td>
				</tr>
			)

		}
		return (
			<tbody>
				{listView}
			</tbody>

		);
	}
	/*
	render()
	{
		return (
			<tr>
				<td onclick="datahaku.naytaIlmoituksenTiedotIsannoitsija(5);"><a href="index.html">Naapuri juhliii</a></td>
				<td>01.2.2018 00:30</td>
				<td colSpan="3">Pekka Töpöhäntä</td>
				<td colSpan="3">Häiriöilmoitus</td>
				<td>Kuitattu 02.02.2018 09:15 - Isännöitsijä Jonne</td>
		    </tr>
		);
	}
	*/
}
