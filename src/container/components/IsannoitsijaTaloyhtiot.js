import React from 'react';
import IsannoitsijaTaloyhtiotLista from './IsannoitsijaTaloyhtiotLista';
import {Link,Redirect} from 'react-router-dom';
import Sorter from '../../Sorter';



export default class EtuSivu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newNotifsOnTop:1
		}
	}

	componentDidMount() {
		this.props.getHousingCompanies();
    this.props.setPageTittle("Taloyhtiöt");
	}

	onChange = (event) => {

		if (event.target.value.length > 0)
			{
			if(event.target.name === "yhtiotHaeYhtionNimella") {
				this.props.getCompaniesByName(event.target.value);
			}
			if(event.target.name === "yhtiotHaeOsoitteella") {
				this.props.getCompaniesByAddress(event.target.value);
			}
		}
		else{
			this.props.getHousingCompanies();

		}
	}

	sortEvent = (event) => {
		let temphousingCompList = this.props.housingCompList;
		let sorter = new Sorter();

			if (event.target.name === "sortaddressdown"){
				temphousingCompList = sorter.sortArrayByField(temphousingCompList,"address",1);
				this.props.setCompanyPropsState(temphousingCompList);
			}
			if (event.target.name === "sortaddressup"){
				temphousingCompList = sorter.sortArrayByField(temphousingCompList,"address",-1);
				this.props.setCompanyPropsState(temphousingCompList);
			}
			if (event.target.name === "sortnamedown"){
				temphousingCompList = sorter.sortArrayByField(temphousingCompList,"name",1);
				this.props.setCompanyPropsState(temphousingCompList);

			}
			if (event.target.name === "sortnameup"){
				temphousingCompList = sorter.sortArrayByField(temphousingCompList,"name",-1);
				this.props.setCompanyPropsState(temphousingCompList);
			}
			if (event.target.name === "newnotifs"){

				if (this.state.newNotifsOnTop === 1)
				{

					this.setState({
						newNotifsOnTop:-1
					});
					temphousingCompList = sorter.sortArrayByField(temphousingCompList,"newnotifs",-1);
					this.props.setCompanyPropsState(temphousingCompList);

				}
				if (this.state.newNotifsOnTop === -1)
				{

					this.setState({
						newNotifsOnTop:1
					});
					this.props.getHousingCompanies();
				}

			}


	}




	render() {
		if (this.props.currentHousingCompany > 0)
		{
		return (<Redirect to='/admin_henkilot'/>);

		}
		else {





		return (
			<div className="card">
			  <div className="card-body">
			   	<h3>Talonyhtiöt</h3>
				  <table className="table table-bordered">
					<thead>
					  <tr>
							<th scope="row"></th>
							<th scope="row" colSpan="3">Yhtiön nimi</th>
							<th scope="row" colSpan="3">Osoite</th>
							<th scope="row">Toiminnot</th>
					 </tr>
					</thead>
					<thead>
					<tr>
					<th scope="row"><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/sort.svg" name="newnotifs" className="img-fluid" alt="[H]" height="20" width="20"/></Link></th>
					<td><input type="text" className="form-control" name="yhtiotHaeYhtionNimella" placeholder="Yhtiön nimi" onChange={this.onChange}/></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysylos.svg" name="sortnameup" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysalas.svg" name="sortnamedown" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td>
					<td><input type="text" className="form-control" name="yhtiotHaeOsoitteella" placeholder="Osoite" onChange={this.onChange}/></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysylos.svg" name="sortaddressup" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td><td><Link to="/" data-toggle="modal" onClick={this.sortEvent}><img src="img/jarjestysalas.svg" name="sortaddressdown" className="img-fluid" alt="[H]" height="20" width="20"/></Link></td>


					<td></td>
					</tr>
					</thead>

					<IsannoitsijaTaloyhtiotLista housingCompList={this.props.housingCompList}
												updateHousingCompany={this.props.updateHousingCompany}
												setCurrentHousingCompany={this.props.setCurrentHousingCompany}/>

				  </table>
				  <Link to="/admin_lisaayhtio" >Lisää yhtiö</Link>
				</div>
			</div>

		);
	}
}
}
