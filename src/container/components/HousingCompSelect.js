import React from 'react';

export default class HousingCompSelect extends React.Component {


	onChange = (event) => {
		if(event.target.name==="housingcompselect") {
			this.props.updateHcid(event.target.value);
		}
	}

  render() {
	let tempView = {}
	if (this.props.housingCompList.length === 0) {
		tempView = <option>Ei taloyhtiöitä</option>
	} else {
		tempView = this.props.housingCompList.map((list) => 
		<option value={list.id} key={list.id}>{list.name}</option>
		)
	}

    return (
			<div className="form-group">
				<label htmlFor="taloyhtio">Taloyhtiö</label>
				<select className="form-control" id="taloyhtio" name="housingcompselect" value={this.props.hcid} onChange={this.onChange}>
					{tempView}
				</select>
			</div>	
		);
	}
}

