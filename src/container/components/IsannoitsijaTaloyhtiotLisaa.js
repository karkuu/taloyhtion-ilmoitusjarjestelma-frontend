import React from 'react';
import {Link} from 'react-router-dom';

export default class IsannoitsijaTaloyhtiotLisaa extends React.Component 
{	
	constructor(props) {
		super(props);
		
		this.state = {
			name:"",
			address:"",
			zip:"",
			city:"",
			business_id:"",
			houses:[]		
		}
	}

	componentDidMount() {
    	this.props.setPageTittle("Taloyhtiön lisäys");
	}
	
	onFormChange = (event) => {
		let tempVal=event.target.value
		this.setState({
			[event.target.name]:tempVal
		});
	}


	flatChange = (event) =>{
		let tempVal=event.target.value
		let tempTarget = event.target.name.split(",");
		let tempHouses = this.state.houses;
		let houseToModify;
		let flatToModify;
		for (let i=0;i<tempHouses.length;i++)
		{
			if (tempHouses[i][0]===parseInt(tempTarget[1],10))
			{
				houseToModify = i;
				for (let ii=0;ii<tempHouses[i][4].length;ii++)
				{
					if (tempHouses[i][4][ii][0]===parseInt(tempTarget[2],10))
					{
						flatToModify = ii;
					}
				}
			}
		}
		if (tempTarget[0]==='flatnumber')
		{
			tempHouses[houseToModify][4][flatToModify][1] = tempVal;
			this.setState({
				houses:tempHouses
			});
		}
		if (tempTarget[0]==='stairway')
		{
			tempHouses[houseToModify][4][flatToModify][2] = tempVal;
			this.setState({
				houses:tempHouses
			});
		}


	}

	houseChange = (event) => {
		let tempVal=event.target.value
		let tempTarget = event.target.name.split(",");
		let tempHouses = this.state.houses;
		let itemToModify;

		for (let i=0;i<tempHouses.length;i++)
		{
			if (tempHouses[i][0]===parseInt(tempTarget[1],10)){
				itemToModify = i;
			}
		}

		if (tempTarget[0]==='haddress')
		{
			tempHouses[itemToModify][1] = tempVal;
			this.setState({
				houses:tempHouses
			});
		}
		if (tempTarget[0]==='hzip')
		{
			tempHouses[itemToModify][2] = tempVal;
			this.setState({
				houses:tempHouses
			});
		}
		if (tempTarget[0]==='hcity')
		{
			tempHouses[itemToModify][3] = tempVal;
			this.setState({
				houses:tempHouses
			});
		}
	}

	delHouse = (event) => {
		let tempHousesList = this.state.houses;

		for (let i=0;i<tempHousesList.length;i++)
		{
			if (tempHousesList[i][0]===parseInt(event.target.name,10))
			{
				tempHousesList.splice(i,1);
			}
		}
	
		this.setState({
			houses:tempHousesList
		});
		
	}

	delFlat = (event) => {
		let tempHousesList = this.state.houses;
		let ids = event.target.name.split(",");
		let houseToModify;
		let flatToModify;

		for (let i=0;i<tempHousesList.length;i++)
		{
			if (tempHousesList[i][0]===parseInt(ids[0],10))
			{
				houseToModify = i;
				for (let ii=0;ii<tempHousesList[i][4].length;ii++)
				{
					if (tempHousesList[i][4][ii]===parseInt(ids[1],10))
					{
						flatToModify = ii;
					}
				}
			}
		}
		tempHousesList[houseToModify][4].splice(flatToModify,1);

		this.setState({
			houses:tempHousesList
		});
	}

	newHouse = (event) => {
		let tempHousesList = this.state.houses;
		let uniqId = 0;
		let i;
		if (tempHousesList.length===0){
			uniqId = 1;
		}
		else
		{
			for (i=0;i<tempHousesList.length;i++)
			{
				if(tempHousesList[i][0]>uniqId)
				{
					uniqId=tempHousesList[i][0];
				}

			}
			uniqId++;
		}
		tempHousesList.push([uniqId,"Osoite", "Postinumero", "Kaupunki",[]]);
		this.setState({
			houses:tempHousesList
		});

	}

	newFlat = (event) => {
		let tempHousesList = this.state.houses;
		let tempTarget = event.target.name.split(",");
		let uniqId = 0;
		let i;
		let itemToModify;

		for (let i=0;i<tempHousesList.length;i++)
		{
			if (tempHousesList[i][0]===parseInt(tempTarget[0],10)){
				itemToModify = i;
			}
		}
		if (tempHousesList[itemToModify][4].length===0){
			uniqId = 1;
		}
		else
		{
			for (i=0;i<tempHousesList[itemToModify][4].length;i++)
			{
				if(tempHousesList[itemToModify][4][i][0]>uniqId)
				{
					uniqId=tempHousesList[itemToModify][4][i][0];
				}

			}
			uniqId++;

		}
		tempHousesList[itemToModify][4].push([uniqId,"Asunto", "Rappu"]);
		this.setState({
			houses:tempHousesList
		});
	}

	submit = (event) => {
		console.log(this.state.houses);
		let tempHousingCompany = {
			name:this.state.name,
			address:this.state.address,
			zip:this.state.zip,
			city:this.state.city,
			business_id:this.state.business_id,
			houses:this.state.houses	
		}
		this.props.addHousingCompany(tempHousingCompany);
	}


	render() {
		let listView = {};

		if (this.state.houses.length === 0) {
			listView = <div className="form-row">Lisää talo painamalla linkkiä.</div>
		} else {
			listView = this.state.houses.map((houses,index) =>
			<div key={houses[0]}>
				<div className="form-row">
					<div className="col-md-1">Talo {index+1}</div>
					<div className="col-md-2"><input type="text" className="form-control" name={"haddress,"+houses[0]} defaultValue={houses[1]} onChange={this.houseChange}></input></div>
					<div className="col-md-2"><input type="text" className="form-control" name={"hzip,"+houses[0]} defaultValue={houses[2]} onChange={this.houseChange}></input></div>
					<div className="col-md-2"><input type="text" className="form-control" name={"hcity,"+houses[0]} defaultValue={houses[3]} onChange={this.houseChange}></input></div>
					<div className="col-md-2"><Link to="/" data-toggle="modal" name={houses[0]} onClick={this.newFlat}>Lisää Asunto</Link></div>
					<div className="col-md-2"><Link to="/" data-toggle="modal" name={houses[0]} onClick={this.delHouse}>Poista talo</Link></div>
				</div>
				<div className="form-row"><label>Talon {index+1} Asunnot</label></div>

				{
				houses[4].map((flats) => {
					return <div className="form-row" key={houses[0]+","+flats[0]}>
		
								<div className="col-md-2"><input type="text" className="form-control" name={"flatnumber,"+houses[0]+","+flats[0]} defaultValue={flats[1]} onChange={this.flatChange}></input></div>
								<div className="col-md-2"><input type="text" className="form-control" name={"stairway,"+houses[0]+","+flats[0]} defaultValue={flats[2]} onChange={this.flatChange}></input></div>
								<div className="col-md-2"><Link to="/" data-toggle="modal" name={houses[0]+","+flats[0]} onClick={this.delFlat}>Poista asunto</Link></div>
							</div>
							})
				}	
			
			</div>)
		}
		
		return (
			
			<div className="col">	
			
				<form>
					<div className="form-row">
					<div className="col-md-4"><label htmlFor="name">Nimi</label>
					<input type="text" className="form-control" name="name" onChange={this.onFormChange}></input></div>
					<div className="col-md-4"><label htmlFor="address">Osoite</label>
					<input type="text" className="form-control" name="address" onChange={this.onFormChange}></input></div>
					</div>
					<div className="form-row">
					<div className="col-md-4"><label htmlFor="zip">Postinumero</label>
					<input type="text" className="form-control" name="zip" onChange={this.onFormChange}></input></div>
					<div className="col-md-4"><label htmlFor="city">Kaupunki</label>
					<input type="text" className="form-control" name="city" onChange={this.onFormChange}></input></div>
					</div>

					<div className="form-row">
					<div className="col-md-4"><label htmlFor="business_id">Y-tunnus</label>
					<input type="text" className="form-control" name="business_id" onChange={this.onFormChange}></input></div>
					</div>
				</form>
				<br/>
				
				<div className="row">
				<Link to="/" data-toggle="modal"  onClick={this.newHouse}>Lisää talo</Link>
 			
				</div>

				<br/>

				<form>
					{listView}
				</form>

				<br/>
				<form action="/admin_yhtiot" method="GET">
					<input type="submit"
							name="submit"
							value="Tallenna uusi yhtiö"
							className="btn btn-primary"
							onClick={this.submit}/>
				</form>
			  </div>
			
		);
	}
}