import React from 'react';

export default class IsannoitsijaHenkilotListaNotifications extends React.Component
{

	render()
	{

		let tempView = {}
		if (this.props.notificationsList.length === 0) {
			tempView = <tr><td colSpan="2">Ei ilmoituksia</td></tr>
		} else {
			tempView = this.props.notificationsList.map((list) =>
			<tr key={list.id}>
				<td><a href="/ilmoitus">{list.title}</a></td>
				<td>{new Date(list.sent_date).toLocaleString("fi-FI")}</td>
		   </tr>
			)
		}

		return (
			<tbody>
				{tempView}
			</tbody>
		);
	}
}
