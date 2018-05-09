import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state={
			uname:"breece2@hibu.com",
			passphrase:"testi"
		}
  }
  
  onChange = (event) => {
		if(event.target.name === "uname") {
			this.setState({
				uname:event.target.value
			});
		}
		if(event.target.name === "passphrase") {
			this.setState({
				passphrase:event.target.value
			});
		}		
	}
	
	onSubmit = (event) => {
		let user = {
			"uname":this.state.uname,
			"passphrase":this.state.passphrase			
		}
		if(event.target.name === "login") {
			this.props.onLogin(user);
		} 
		event.preventDefault();
	}




  render() {
    return (
			<div className="card">
		     <div className="card-body">
            <div className="row">
	            <div className="col">
	            </div>
	          <div className="col">
						asukas: hwormstone1@goodreads.com
						<br/>
						isännöitsijä: breece2@hibu.com

		        <form onSubmit={this.onSubmit}>
		          <div className="form-group">
		            <label htmlFor="uname">Sähköposti</label>
                <input type="email"
                        name="uname"
                        value={this.state.uname}
					              onChange={this.onChange}
                        className="form-control"
                        id="uname"
                        aria-describedby="emailHelp"
                        placeholder="Kirjoita sähköpostiosoitteesi"/>
		          </div>
		          <div className="form-group">
		            <label htmlFor="passphrase">Salasana</label>
                <input type="password"
                        name="passphrase"
                        value={this.state.passphrase}
                        onChange={this.onChange}
                        className="form-control"
                        id="passphrase"
                        placeholder="Salasana"/>
		          </div>
              <input type="button"
					            name="login"
					            value="Kirjaudu"
					            onClick={this.onSubmit}
                      className="btn btn-primary"/>
		        </form>
	        </div>
	        <div className="col">
	        </div>
	      </div>
      </div>
    </div> 
    );
  }
}
