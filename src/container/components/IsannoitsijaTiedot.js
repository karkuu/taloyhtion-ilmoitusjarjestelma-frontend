import React from 'react';

export default class EtuSivu extends React.Component {
  render() {
    return (
		<div class="card">
		  <div class="card-body">
		    <form>
			<div class="form-row">
				<div class="form-group col-md-3">
					<label for="formGroupNimi">Nimi</label>
					<input type="text" class="form-control" id="formGroupNimi" placeholder="Nimi"/>
				</div>
				<div class="form-group col-md-3">
					<label for="formGroupNimi">Sukunimi</label>
					<input type="text" class="form-control" id="formGroupNimi" placeholder="Sukunimi"/>
				</div>
			</div>
			<div class="form-groupform-group">
				<label for="formGroupOsoite">Osoite</label>
				<input type="text" class="form-control" id="formGroupOsoite" placeholder="Osoite"/>
			</div>
			<div class="form-row">
				<div class="form-group col-md-2">
					<label for="formGroupPostinumero">Postinumero</label>
					<input type="text" class="form-control" id="formGroupPostinumero" placeholder="Postinumero"/>
				</div>
				<div class="form-group col-md-4">
					<label for="formGroupPostinumero">Postitoimipaikka</label>
					<input type="text" class="form-control" id="formGroupPostinumero" placeholder="Postitoimipaikka"/>
				</div>
			</div>	
			<div class="form-group">
				<label for="kayttajaInputEmail1">Sähköposti</label>
				<input type="email" class="form-control" id="kayttajaInputEmail1" aria-describedby="emailHelp" placeholder="Syötä sähköposti"/>
				<small id="emailHelp" class="form-text text-muted">Emme tee osoitteellasi mitään laitonta.</small>
			</div>
			<p>Salasanan vaihtaminen</p>
			<div class="form-group">
				<label for="kayttajaInputPassword1">Salasana</label>
				<input type="password" class="form-control" id="kayttajaInputPassword1" placeholder="Salasana"/>
			</div>
			<div class="form-group">
				<label for="InputPassword1">Salasana uudestaan</label>
				<input type="kayttajaInputPassword2" class="form-control" id="kayttajaInputPassword2" placeholder="Salasana uudestaan"/>	
			</div>
	
			<button type="submit" class="btn btn-primary">Tallenna</button>
		</form>
		  </div>
		</div>
    );
  }
}
