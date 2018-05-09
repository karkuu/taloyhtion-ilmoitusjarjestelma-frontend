import React from 'react';

export default class EtuSivu extends React.Component
{
	render()
	{
		return (
			<tr>
				<td><a href="index.html" onclick="datahaku.naytaIlmoituksenTiedotAsukas(1);">Kissa katolla apua</a></td>
				<td>15.2.2018 09:15</td>
				<td colspan="3">Taavetti Tompainen</td>
				<td colspan="3">Muu palaute</td>
				<td>
					<a href="index.html"><img src="img/ilmoitukset.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a>
					<a href="index.html"><img src="img/asetukset.svg" class="img-fluid" alt="[H]" height="20" width="20"/></a>
				</td>
		    </tr>		    
		);
	}
}
