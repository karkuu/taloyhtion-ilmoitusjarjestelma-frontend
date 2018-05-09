import React from 'react';

export default class EtuSivu extends React.Component {

  componentDidMount() {
    this.props.setPageTittle("Uusi ilmoitus");
  }
  
   constructor(props) {
     super(props);
     this.state = {value: ''};

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }  
  
     handleChange(event) {
     this.setState({value: event.target.value});
  } 
  
     handleSubmit(event) {
     alert('Ilmoitus on lähetetty! ' + this.state.value);
     event.preventDefault();
  }
  
  
  
  render() {
    return (
		<div className="card">
		  <div className="card-body">
	      <h3>Ilmoituslomake</h3>
        <p>Hei {this.props.loggedUser.first_name}, voit jättää tässä uuden ilmoituksen.</p>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="taloyhtio">Ilmoituksen otsikko</label>
              <input type="text" className="form-control" id="otsikko" placeholder="kirjoita otsikko"/>
            </div>
            <div className="form-group col-md-6">
              <div className="form-group">
                <label htmlFor="ilmoitustyyppi">Valitse ilmoitustyyppi</label>
                <select className="form-control" id="ilmoitustyyppi">
			{/* <select value={this.state.value} onChange={this.handleChange}> */}
                  <option>Vikailmoitus (H)</option>
			  {/* <option value="vikailmoitus">Vikailmoitus (H)</option> */}
                  <option>Avaimet (H)</option>
			  {/* <option value="avaimet">Avaimet (H)</option> */}
                  <option>Autopaikat (H)</option>
			  {/* <option value="autopaikat">Autopaikat (H)</option> */}
                  <option>Saunavuorot (H)</option>
			  {/* <option value="saunavuorot">Saunavuorot (H)</option> */}
                  <option>Lähtöilmoitus (I)</option>
			  {/* <option value="lahtoilmoitus">Lähtöilmoitus (I)</option> */}	  
                  <option>Vastikeasiat (I)</option>
			  {/* <option value="vastikeasiat">Vastikeasiat (I)</option> */}	 	  
                  <option>Häiriöilmoitus (I)</option>
			  {/* <option value="hairioilmoitus">Häiriöilmoitus (I)</option> */}
                  <option>Reklamaatio (I)</option>
			  {/* <option value="reklamaatio">Reklamaatio (I)</option> */}	  
                  <option>Muu palaute (I)</option>
			  {/* <option value="muu palaute">Muu palaute (I)</option> */}	  
                  <option>Yhteydenotto (I) (H)</option>
			  {/* <option value="yhteydenotto">Yhteydenotto (I)</option> */}		  
                </select>
              </div>
           </div>
          </div>

          <div className="form-group">
            <label htmlFor="kuvaus">Ilmoituksen tarkempi kuvaus</label>
            <textarea className="form-control" id="kuvaus" rows="5"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Lähetä ilmoitus</button>
          <br/><br/>
        </form>
		  </div>
		</div>
    );
  }
}
