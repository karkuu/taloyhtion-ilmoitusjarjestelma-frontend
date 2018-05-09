import React from 'react';
import {Link} from 'react-router-dom';
import Sorter from '../../Sorter';

import IsannoitsijaHenkilotListaNotifications from './IsannoitsijaHenkilotListaNotifications';
import HousingCompSelect from './HousingCompSelect';
import HouseSelect from './HouseSelect';
import FlatSelect from './FlatSelect';

export default class IsannoitsijaHenkilotLista extends React.Component
{
	constructor(props) {
		super(props);

		this.updateHcid = this.updateHcid.bind(this);
		this.updateHid = this.updateHid.bind(this);
		this.updateFid = this.updateFid.bind(this);
	

		this.state={
			id:"",
			first_name:"",
			last_name:"",
			email:"",
			phone:"",
			billing_address:"",
			zip:"",
			city:"",
			h_address:"",
			stairway:"",
			flat_number:"",
			h_zip:"",
			h_city:"",
			fid:"",
			hid:"",
			hcid:""
		}
	}
	componentDidMount() {
		this.props.getHousingCompanies();

	}

	updateHcid(id){
		this.props.getHousesByHousingCompany(id);
		this.setState({
			hcid:id
		});
	}

	updateHid(id){
		this.props.getFlatsByHouse(id);
		this.setState({
			hid:id
		});
	}
	
	updateFid(id){
		this.setState({
			fid:id
		});
	}

	setCurrentPersonState(target){

		for(let i=0;i<this.props.userList.length;i++){
			if (this.props.userList[i].id === parseInt(target,10)){
				this.setState({
						id:this.props.userList[i].id,
						first_name:this.props.userList[i].first_name,
						last_name:this.props.userList[i].last_name,
						email:this.props.userList[i].email,
						phone:this.props.userList[i].phone,
						billing_address:this.props.userList[i].billing_address,
						zip:this.props.userList[i].zip,
						city:this.props.userList[i].city,
						h_address:this.props.userList[i].h_address,
						stairway:this.props.userList[i].stairway,
						flat_number:this.props.userList[i].flat_number,
						h_zip:this.props.userList[i].h_zip,
						h_city:this.props.userList[i].h_city,
						fid:this.props.userList[i].fid,
						hid:this.props.userList[i].hid,
						hcid:this.props.userList[i].hcid
				})
				this.props.getHousesByHousingCompany(this.props.userList[i].hcid);
				this.props.getFlatsByHouse(this.props.userList[i].hid);
				console.log(this.props.userList[i].hcid+" "+this.props.userList[i].hid+" "+this.props.userList[i].fid)
			}
		}
	}

	getNotificationsByUidStatus = (event) => {
		this.props.getNotificationsByUidStatus(event.target.name,1);
		this.setCurrentPersonState(event.target.name);
	}

	onChange = (event) => {
		if (event.target.value.length > 0)
			{
			if(event.target.name === "henkilotHaeNimella") {
				this.props.getUsersByName(event.target.value);
			}
			if(event.target.name === "henkilotHaeOsoitteella") {
				this.props.getUsersByAddress(event.target.value);
			}
		}
		else{
			this.props.getUsers();

		}
	}

	sortEvent = (event) => {
		let tempUserList = this.props.userList;
		let sorter = new Sorter();

		if (event.target.name === "sortaddressdown"){
			tempUserList = sorter.sortArrayByField(tempUserList,"h_address",1);
			this.props.setUserPropsState(tempUserList);
		}
		if (event.target.name === "sortaddressup"){
			tempUserList = sorter.sortArrayByField(tempUserList,"h_address",-1);
			this.props.setUserPropsState(tempUserList);
		}
		if (event.target.name === "sortnamedown"){
			tempUserList = sorter.sortArrayByField(tempUserList,"fullname",1);
			this.props.setUserPropsState(tempUserList);

		}
		if (event.target.name === "sortnameup"){
			tempUserList = sorter.sortArrayByField(tempUserList,"fullname",-1);
			this.props.setUserPropsState(tempUserList);
		}
	}

	onFormChange = (event) => {
		if(event.target.name==="first_name") {
			this.setState({
				first_name:event.target.value
			})
		}
		if(event.target.name==="last_name") {
			this.setState({
				last_name:event.target.value
			})
		}
		if(event.target.name==="email") {
			this.setState({
				email:event.target.value
			})
		}
		if(event.target.name==="phone") {
			this.setState({
				phone:event.target.value
			})
		}
		if(event.target.name==="b_address") {
			this.setState({
				billing_address:event.target.value
			})
		}
		if(event.target.name==="b_zip") {
			this.setState({
				zip:event.target.value
			})
		}
		if(event.target.name==="b_city") {
			this.setState({
				city:event.target.value
			})
		}
		if(event.target.name==="stairway") {
			this.setState({
				stairway:event.target.value
			})
		}
		if(event.target.name==="flat_number") {
			this.setState({
				flat_number:event.target.value
			})
		}
		if(event.target.name==="h_city") {
			this.setState({
				h_city:event.target.value
			})
		}
		if(event.target.name==="h_zip") {
			this.setState({
				h_zip:event.target.value
			})
		}
	}

	submit = (event) => {
		console.log(this.state.b_address)
		event.preventDefault();
		let tempUser = {
			id:this.state.id,
			hcid:this.state.hcid,
			hid:this.state.hid,
			fid:this.state.fid,
			first_name:this.state.first_name,
			last_name:this.state.last_name,
			email:this.state.email,
			phone:this.state.phone,
			billing_address:this.state.billing_address,
			zip:this.state.zip,
			city:this.state.city,
			h_address:this.state.h_address,
			stairway:this.state.stairway,
			flat_number:this.state.flat_number,
			h_zip:this.state.h_zip,
			h_city:this.state.h_city
		}
		this.props.updateUserByAdmin(tempUser);
	}

	render()
	{
		let tempView = {}
		if (this.props.userList.length === 0) {
			tempView = <tr><td>Ei henkilöitä näkyvillä..</td></tr>
		} else {
			tempView = this.props.userList.map((list) =>
			<tr key={list.id}>
				<th colSpan="3" scope="row">

					<Link to="/" data-toggle="modal" name={list.id} id={`#${list.id}`} data-target={`#${list.id}`} onClick={this.getNotificationsByUidStatus}>{list.last_name} {list.first_name}</Link>

					<div className="modal fade" id={`${list.id}`} tabIndex="-1" role="dialog" aria-labelledby={`${list.name}`} aria-hidden="true">
					  <div className="modal-dialog" role="document">
					    <div className="modal-content">
					      <div className="modal-header">
					        <h5 className="modal-title">{list.last_name} {list.first_name}</h5>
					        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div className="modal-body">
									<form>
									  <div className="form-group">
									    <label htmlFor="name">Etunimi</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="first_name" defaultValue={`${list.first_name}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="address">Sukunimi</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="last_name" defaultValue={`${list.last_name}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="zip">Email</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="email" defaultValue={`${list.email}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="city">Puhelinnumero</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="phone" defaultValue={`${list.phone}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="business_id">Laskutusosoite</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="b_address" defaultValue={`${list.billing_address}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="business_id">Laskutus postinumero</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="b_zip" defaultValue={`${list.zip}`}></input>
										</div>
										<div className="form-group">
									    <label htmlFor="business_id">Laskutus kaupunki</label>
									    <input type="text" onChange={this.onFormChange} className="form-control" name="b_city" defaultValue={`${list.city}`}></input>
										</div>

										<HousingCompSelect housingCompList={this.props.housingCompList}
															setCurrentHousingCompany={this.props.setCurrentHousingCompany}
															hcid={this.state.hcid}
															updateHcid={this.updateHcid}/>
										<HouseSelect housesList={this.props.housesList}
													hid={this.state.hid}
													updateHid={this.updateHid}/>
										<FlatSelect flatsList={this.props.flatsList}
													fid={this.state.fid}
													updateFid={this.updateFid}/>

									</form>

									<h5>Käyttäjän aktiiviset ilmoitukset:</h5>
									<table>
										<thead>
											<tr>
												<td>Otsikko</td>
												<td>Aika</td>
											</tr>
										</thead>

										<IsannoitsijaHenkilotListaNotifications notificationsList={this.props.notificationsList}/>

									</table>
					      </div> {/* modal body end */}

					      <div className="modal-footer">
					        <button type="button" className="btn btn-secondary" data-dismiss="modal">Sulje</button>
									<input type="submit"
		       						name="submit"
											value="Tallenna"
											data-dismiss="modal"
											onClick={this.submit}
											className="btn btn-success"/>
					      </div>
						  	<div className="modal-footer">
									<button type="button" className="btn btn-danger" data-dismiss="modal">Poista käyttäjä</button>
					      </div>
					    </div>
					  </div>
					</div> {/* modal end */}

				</th>

				<td colSpan="3">{list.h_address}</td>
				<td>
					<a href="/admin_ilmoitukset"><img src="img/ilmoitukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/></a>
					<a href="/asetukset"><img src="img/asetukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/></a>
				</td>

			</tr>
			)
		}

		return (
			<tbody>
				<tr>
					<td><input type="text" className="form-control" name="henkilotHaeNimella" placeholder="Nimi" onChange={this.onChange}/></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysylos.svg" name="sortnameup" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysalas.svg" className="img-fluid" name="sortnamedown" alt="[H]" height="20" width="20"/></Link></td>
					<td><input type="text" className="form-control" name="henkilotHaeOsoitteella" placeholder="Osoite" onChange={this.onChange}/></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysylos.svg" name="sortaddressup" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysalas.svg" name="sortaddressdown" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td>
					<td></td>
				</tr>

				{tempView}

			</tbody>
		);
	}
}
