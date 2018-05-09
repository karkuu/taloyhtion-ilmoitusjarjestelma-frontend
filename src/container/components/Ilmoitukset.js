import React from 'react';

import IlmoituksetLista from './IlmoituksetLista';
import IlmoituksetListaKuitatut from './IlmoituksetListaKuitatut';

export default class EtuSivu extends React.Component {

  render() {
    return (
		<div class="card">
		  <div class="card-body">
			<h3>Uudet ilmoitukset</h3>
		<table class="table table-bordered">
		  <thead>
		    <tr>
         <th>Ilmoitus</th>
         <th>Päivämäärä</th>
         <th colspan="3">Ilmoittaja</th>
         <th colspan="3">Ilmoitus</th>
         <th>Toiminnot</th>
		    </tr>
		  </thead>
		  <tbody>
        <tr>
          <td></td>
          <td></td>
          <td><input type="text" class="form-control" id="ilmoitusHaeNimellä" placeholder="Nimi" /></td>
          <td><a href="index.html"><img src="img/jarjestysylos.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
          <td><a href="index.html"><img src="img/jarjestysalas.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
          <td><input type="text" class="form-control" id="ilmoitusHaeTyyppi" placeholder="Ilmoitus" /></td>
          <td><a href="index.html"><img src="img/jarjestysylos.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
          <td><a href="index.html"><img src="img/jarjestysalas.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
          <td></td>
        </tr>



			<IlmoituksetLista/>




		  </tbody>
		</table>

   <h3>Kuitatut ilmoitukset</h3>
   <table class="table table-bordered" id="oldElements">
     <thead class="thead-light">
       <tr>
         <th>Ilmoitus</th>
         <th>Päivämäärä</th>
         <th colspan="3">Ilmoittaja</th>
         <th colspan="3">Ilmoitus</th>
         <th>Kuittaus</th>
		    </tr>
		  </thead>
		  <tbody>
       <tr>
         <td></td>
         <td></td>
         <td><input type="text" class="form-control" id="ilmoitusHaeNimellä" placeholder="Nimi" /></td>
         <td><a href="index.html"><img src="img/jarjestysylos.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
         <td><a href="index.html"><img src="img/jarjestysalas.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
         <td><input type="text" class="form-control" id="ilmoitusHaeTyyppi" placeholder="Ilmoitus" /></td>
         <td><a href="index.html"><img src="img/jarjestysylos.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
         <td><a href="index.html"><img src="img/jarjestysalas.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a></td>
         <td></td>
       </tr>


			<IlmoituksetListaKuitatut/>






		  </tbody>
   </table>
		<a href="index.html">Lisää ilmoituksia...</a>
		<br/><br/>
		  </div>
		</div>
    );
  }
}
