import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import EtuSivu from './components/EtuSivu';
import IsannoitsijaIlmoitukset from './components/IsannoitsijaIlmoitukset';
import IsannoitsijaHenkilot from './components/IsannoitsijaHenkilot';
import IsannoitsijaEtuSivu from './components/IsannoitsijaEtuSivu';
import IsannoitsijaTiedot from './components/IsannoitsijaTiedot';
import IsannoitsijaTaloyhtiot from './components/IsannoitsijaTaloyhtiot';
import Ilmoitukset from './components/Ilmoitukset';
import Ilmoituslomake from './components/Ilmoituslomake';
import Tiedot from './components/Tiedot';
import IsannoitsijaTaloyhtiotLisaa from './components/IsannoitsijaTaloyhtiotLisaa';

export default class ContainerContents extends React.Component
{
	constructor(props) {
		super(props);
		this.setCurrentHousingCompany = this.setCurrentHousingCompany.bind(this);

		this.state = {
			currentHousingCompany:0
		}
	}

	setCurrentHousingCompany(id){
		this.setState({
			currentHousingCompany:id
		});
	}

	render()
	{
		return (
			<Switch>
				<Route exact path="/"
					render={
						() => !this.props.isLogged  ?
						(<Redirect to="/login"/>) : this.props.userGroup === 3 ?
						(<IsannoitsijaEtuSivu loggedUser={this.props.loggedUser}
											  setPageTittle={this.props.setPageTittle}
											  notificationsList={this.props.notificationsList}
											  getNotificationsNew={this.props.getNotificationsNew}
											  updateNotification={this.props.updateNotification}
											  updateNotificationStatus={this.props.updateNotificationStatus}/>) :
						(<EtuSivu loggedUser={this.props.loggedUser}
											setPageTittle={this.props.setPageTittle}
											getNotificationsByUid={this.props.getNotificationsByUid}
											notificationsList={this.props.notificationsList}/>)
					}/>

				<Route path="/ilmoitukset"
					render={() => this.props.isLogged ?
						(<Ilmoitukset />) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/ilmoituslomake"
					render={() => this.props.isLogged ?
						(<Ilmoituslomake loggedUser={this.props.loggedUser}
												setPageTittle={this.props.setPageTittle}/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/tiedot"
					render={() => this.props.isLogged ?
						(<Tiedot setPageTittle={this.props.setPageTittle}/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/admin_ilmoitukset"
					render={() => this.props.isLogged ?
						(<IsannoitsijaIlmoitukset notificationsList={this.props.notificationsList}
													getNotifications={this.props.getNotifications}
													setPageTittle={this.props.setPageTittle}
													updateNotificationStatus={this.props.updateNotificationStatus}
													updateNotification={this.props.updateNotification}/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/admin_henkilot"
					render={() => this.props.isLogged?
						(<IsannoitsijaHenkilot  currentHousingCompany={this.state.currentHousingCompany}
												userList={this.props.userList}
												flatsList={this.props.flatsList}
												housesList={this.props.housesList}
												notificationsList={this.props.notificationsList}
												housingCompList={this.props.housingCompList}

												updateUser={this.props.updateUser}
												updateUserByAdmin={this.props.updateUserByAdmin}

												setPageTittle={this.props.setPageTittle}

												setUserPropsState={this.props.setUserPropsState}
												setCurrentHousingCompany={this.setCurrentHousingCompany}

												getUsers={this.props.getUsers}
												getNotificationsByUidStatus={this.props.getNotificationsByUidStatus}
												getUsersByName={this.props.getUsersByName}
												getUsersByAddress={this.props.getUsersByAddress}
												getUsersByHousingCompany={this.props.getUsersByHousingCompany}
												getFlatsByHouse={this.props.getFlatsByHouse}
									   			getHousesByHousingCompany={this.props.getHousesByHousingCompany}
												getHousingCompanies={this.props.getHousingCompanies}/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/admin_tiedot"
					render={() => this.props.isLogged ?
						(<IsannoitsijaTiedot/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/admin_lisaayhtio"
					render={() => this.props.isLogged ?
						(<IsannoitsijaTaloyhtiotLisaa addHousingCompany={this.props.addHousingCompany}
														setPageTittle={this.props.setPageTittle}/>) :
						(<Redirect to="/"/>)
						}/>
				<Route path="/admin_yhtiot"
					render={() => this.props.isLogged ?
						(<IsannoitsijaTaloyhtiot currentHousingCompany={this.state.currentHousingCompany}
												housingCompList={this.props.housingCompList}
												getHousingCompanies={this.props.getHousingCompanies}
												getCompaniesByName={this.props.getCompaniesByName}
									  			getCompaniesByAddress={this.props.getCompaniesByAddress}
												setCompanyPropsState={this.props.setCompanyPropsState}
												setCurrentHousingCompany={this.setCurrentHousingCompany}
												setPageTittle={this.props.setPageTittle}
												updateHousingCompany={this.props.updateHousingCompany}/>) :
						(<Redirect to="/"/>)
						}/>

			</Switch>
		);
	}
}
