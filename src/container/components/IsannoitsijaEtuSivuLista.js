import React from 'react';
import {Link} from 'react-router-dom';
import {getIlmoitustyyppiById} from '../../Helper.js';

export default class EtuSivu extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			id:0,
			comment:"",
			currentNotif: 0
		}
	}
	componentDidMount() {

		this.props.getNotificationsNew();
	}

	changeStatus = (event) =>{
		if (event.target.name === "received"){
			this.props.updateNotificationStatus(event.target.id,2,0);
		}
		if (event.target.name === "beingworked"){
			this.props.updateNotificationStatus(event.target.id,3,0);
		}
		if (event.target.name === "cancelled"){
			this.props.updateNotificationStatus(event.target.id,4,0);
		}
		if (event.target.name === "done"){
			this.props.updateNotificationStatus(event.target.id,5,0);
		}
	}

	setCurrentNotification = (event) =>
	{
		for(let i=0;i<this.props.notificationsList.length;i++){
			if (this.props.notificationsList[i].id === parseInt(event.target.name,10)){

				this.setState({
					id:parseInt(event.target.name,10),
					currentNotif:this.props.notificationsList[i].id,
					comment:this.props.notificationsList[i].checkout_message,

				})
			}
		}
	}

	onFormChange = (event) => {
		if(event.target.name==="comment") {
			this.setState({
				comment:event.target.value
			});
		}
	}

	submit = (event) => {
		event.preventDefault();
			let tempNotif = {
			id:this.state.id,
			comment:this.state.comment,
			page:"etusivu"

		}
		this.props.updateNotification(tempNotif);
	}


	render() {

		let listView = {}

		if (this.props.notificationsList.length === 0) {
			listView = <tr><td colSpan="8"><p>Ei uusia ilmoituksia listassa</p></td></tr>
		} else {
			listView = this.props.notificationsList.map((notif) =>
				<tr key={notif.id}>
            <td ><Link to="/" data-toggle="modal" name={notif.id} data-target={`#${notif.id}`} onClick={this.setCurrentNotification} >{notif.title}</Link>

						{/* Modal start */}

						<div className="modal fade" id={`${notif.id}`} tabIndex="-1" role="dialog" aria-labelledby={`${notif.name}`} aria-hidden="true">
							<div className="modal-dialog" role="document" style={{maxWidth:'800px'}}>
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id={`${notif.id}`}>{notif.title}</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">

										<table className="table table-bordered">
											<tbody>
												<tr>
													<th>Ilmoitustyyppi</th>
													<td colSpan="3">{getIlmoitustyyppiById(notif.notif_type)}</td>
												</tr>
												<tr>
													<th>Talonyhtiö</th>
													<td>{notif.name}</td>
													<th>Huoneisto</th>
													<td>x</td>
												</tr>
												<tr>
													<th>Lähettäjä</th>
													<td colSpan="3">{notif.fullname}</td>
												</tr>
												<tr>
													<th>Osoite</th>
													<td>{notif.billing_address}</td>
													<th>Postinumero</th>
													<td>{notif.ub_zip}</td>
												</tr>
												<tr>
													<th>Postitoimipaikka</th>
													<td colSpan="3">{notif.ub_city}</td>
												</tr>
												<tr>
													<th>Puhelin</th>
													<td>{notif.phone}</td>
													<th>Sähköposti</th>
													<td>{notif.email}</td>
												</tr>
												<tr>
													<th colSpan="4">Kuvaus</th>
												</tr>
												<tr>
													<td colSpan="4">{notif.message}</td>
												</tr>
											</tbody>
										</table>

										<form>
											<label htmlFor="statusChange">Muuta tilaa:</label>
											<Link to="/" data-toggle="modal" title="vastaanotettu" onClick={this.changeStatus}>
												{(notif.status === 2) ? (
												<img src="img/vastaanotettu.svg"  className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
												) : (
												<img src="img/vastaanotettu.svg" id={notif.id} name="received" className="img-fluid" alt="[H]" height="20" width="20"/>
												)}
											</Link>
											<Link to="/" data-toggle="modal" title="työn alla" onClick={this.changeStatus}>
												{(notif.status === 3) ? (
												<img src="img/tyonalla.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
												) : (
												<img src="img/tyonalla.svg" id={notif.id} name="beingworked" className="img-fluid" alt="[H]" height="20" width="20"/>
												)}
											</Link>
											<Link to="/" data-toggle="modal" title="keskeytynyt" onClick={this.changeStatus}>
												{(notif.status === 4) ? (
												<img src="img/keskeytynyt.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
												) : (
												<img src="img/keskeytynyt.svg" id={notif.id} name="cancelled" className="img-fluid " alt="[H]" height="20" width="20"/>
												)}
											</Link>
											<Link to="/" data-toggle="modal" title="valmis" onClick={this.changeStatus}>
												{(notif.status === 5) ? (
												<img src="img/valmis.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
												) : (
												<img src="img/valmis.svg" id={notif.id} name="done" className="img-fluid" alt="[H]" height="20" width="20"/>
												)}
											</Link>
											<div className="form-row">
												<label htmlFor="comment">Kommentti</label>
												<textarea onChange={this.onFormChange} className="form-control" name="comment" rows="3" defaultValue={notif.checkout_message}></textarea>
											</div>
											</form>

									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
										<input type="submit"
												name="submit"
										value="Tallenna"
										data-dismiss="modal"
										onClick={this.submit}
										className="btn btn-primary"/>
									</div>
								</div>
							</div>
						</div>

						{/* Modal end */}
						</td>

            <td>{new Date(notif.sent_date).toLocaleString("fi-FI")}</td>
            <td>{notif.first_name} {notif.last_name}</td>
            <td>{getIlmoitustyyppiById(notif.notif_type)}</td>
            <td>
							<Link to="/" data-toggle="modal" title="vastaanotettu" onClick={this.changeStatus}>
								{(notif.status === 2) ? (
								<img src="img/vastaanotettu.svg"  className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
								) : (
								<img src="img/vastaanotettu.svg" id={notif.id} name="received" className="img-fluid" alt="[H]" height="20" width="20"/>
								)}
							</Link>
							<Link to="/" data-toggle="modal" title="työn alla" onClick={this.changeStatus}>
								{(notif.status === 3) ? (
								<img src="img/tyonalla.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
								) : (
								<img src="img/tyonalla.svg" id={notif.id} name="beingworked" className="img-fluid" alt="[H]" height="20" width="20"/>
								)}
							</Link>
							<Link to="/" data-toggle="modal" title="keskeytynyt" onClick={this.changeStatus}>
								{(notif.status === 4) ? (
								<img src="img/keskeytynyt.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
								) : (
								<img src="img/keskeytynyt.svg" id={notif.id} name="cancelled" className="img-fluid " alt="[H]" height="20" width="20"/>
								)}
							</Link>
							<Link to="/" data-toggle="modal" title="valmis" onClick={this.changeStatus}>
								{(notif.status === 5) ? (
								<img src="img/valmis.svg" className="img-fluid border border-dark rounded bg-success" alt="[H]" height="20" width="20"/>
								) : (
								<img src="img/valmis.svg" id={notif.id} name="done" className="img-fluid" alt="[H]" height="20" width="20"/>
								)}
							</Link>
						</td>
				</tr>
			)
		}
		return (
			<tbody>
				{listView}
			</tbody>

		);
	}
}
