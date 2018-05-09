import React from 'react';
import {Link} from 'react-router-dom';


export default class EtuSivu extends React.Component {

	constructor(props) {
		super(props);
		this.state={
				id:"",
				name:"",
        address:"",
        zip:"",
        city:"",
        business_id:""
		}
	}

	setCurrenHcState(target){
		
		for(let i=0;i<this.props.housingCompList.length;i++){
			if (this.props.housingCompList[i].id === parseInt(target,10)){
				this.setState({
					id:this.props.housingCompList[i].id,
					name:this.props.housingCompList[i].name,
					address:this.props.housingCompList[i].address,
					zip:this.props.housingCompList[i].zip,
					city:this.props.housingCompList[i].city,
					business_id:this.props.housingCompList[i].business_id
				})
			}
		}
	}


	getCurrentHousingComp = (event) => {
		this.setCurrenHcState(event.target.name);
	}


	onFormChange = (event) => {
		if(event.target.name==="name") {
			this.setState({
				name:event.target.value
			})
		}
		if(event.target.name==="address") {
			this.setState({
				address:event.target.value
			})
		}
		if(event.target.name==="zip") {
			this.setState({
				zip:event.target.value
			})
		}
		if(event.target.name==="city") {
			this.setState({
				city:event.target.value
			})
		}
		if(event.target.name==="business_id") {
			this.setState({
				business_id:event.target.value
			})
		}
	}

	submit = (event) => {
		event.preventDefault();
		let tempHc = {
			id:this.state.id,
			name:this.state.name,
      address:this.state.address,
      zip:this.state.zip,
      city:this.state.city,
      business_id:this.state.business_id
		}
		
		this.props.updateHousingCompany(tempHc);
	}

	linkClickEvent = (event) =>{
		if (event.target.name === "redirecttousers"){
		
			this.props.setCurrentHousingCompany(event.target.id);
		}
	}


	render() {

		let listView = {}

		if (this.props.housingCompList.length === 0) {
			listView = <tr><td colSpan="8"><p>Ei taloyhtiöitä listassa</p></td></tr>
		} else {
			listView = this.props.housingCompList.map((housingComp) =>
				<tr key={housingComp.id}>
					<th scope="row">{housingComp.newnotifs > 0 && 
					"*"
					}</th>

					<td colSpan="3">
					<Link to="/" data-toggle="modal" name={housingComp.id} id={`#${housingComp.id}`} data-target={`#${housingComp.id}`} onClick={this.getCurrentHousingComp}>{housingComp.name}</Link>

							<div className="modal fade" id={`${housingComp.id}`} tabIndex="-1" role="dialog" aria-labelledby={`${housingComp.name}`} aria-hidden="true">
							  <div className="modal-dialog" role="document">
							    <div className="modal-content">
							      <div className="modal-header">
							        <h5 className="modal-title" id={`${housingComp.name}`}>Muokkaa yhtiötä: {housingComp.name}</h5>
							        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
							          <span aria-hidden="true">&times;</span>
							        </button>
							      </div>
							      <div className="modal-body">

											<form>
											  <div className="form-group">
											    <label htmlFor="name">Nimi</label>
											    <input type="text" className="form-control" name="name" defaultValue={`${housingComp.name}`} onChange={this.onFormChange}></input>
												</div>
												<div className="form-group">
											    <label htmlFor="address">Osoite</label>
											    <input type="text" className="form-control" name="address" defaultValue={`${housingComp.address}`} onChange={this.onFormChange}></input>
												</div>
												<div className="form-group">
											    <label htmlFor="zip">Postinumero</label>
											    <input type="text" className="form-control" name="zip" defaultValue={`${housingComp.zip}`} onChange={this.onFormChange}></input>
												</div>
												<div className="form-group">
											    <label htmlFor="city">Kaupunki</label>
											    <input type="text" className="form-control" name="city" defaultValue={`${housingComp.city}`} onChange={this.onFormChange}></input>
												</div>
												<div className="form-group">
											    <label htmlFor="business_id">Y-tunnus</label>
											    <input type="text" className="form-control" name="business_id" defaultValue={`${housingComp.business_id}`} onChange={this.onFormChange}></input>
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

					</td>

					<td colSpan="3">{housingComp.address}, {housingComp.city}</td>
		
					<td>
					
						<Link to="/admin_henkilot" data-toggle="modal" onClick={this.linkClickEvent}><img src="img/henkilot.svg" id={housingComp.id} name="redirecttousers" className="img-fluid" alt="[H]" height="20" width="20"/></Link>
						<a href="/admin_ilmoitukset"><img src="img/ilmoitukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/></a>
						<a href="/" data-toggle="modal" data-target={`#${housingComp.id}`}><img src="img/asetukset.svg" className="img-fluid" alt="[H]" height="20" width="20"/></a>
					
						
					
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
