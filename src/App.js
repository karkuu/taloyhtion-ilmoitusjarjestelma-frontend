import React, { Component } from 'react';
import ContainerTop from './container/ContainerTop';
import ContainerMid from './container/ContainerMid';
import ContainerContents from './container/ContainerContents';
import Login from './container/Login';
import Crypto from './Crypto';


export default class App extends Component {

	constructor(props) {
		super(props);
		this.setUserPropsState = this.setUserPropsState.bind(this);
		this.setCompanyPropsState = this.setCompanyPropsState.bind(this);
		this.setPageTittle = this.setPageTittle.bind(this);
		this.getUsersByHousingCompany = this.getUsersByHousingCompany.bind(this);

		this.state = {
			//not logged in group 0 (3:admin| 2:huoltomies | 1:asukas)
			userGroup:0,
			isLogged:false,
			token:"",
			salt:'jg#¤gdml5begf%Wgwerbewegewbmwvie4WEGobw',
			loggedUser: [],
			notificationsList: [],
			userList: [],
			housingCompList:[],
			flatsList:[],
			housesList:[],
			sortSettings:{
				usersSortNameAddress:0,
				usersSortAsc:0,
				companySortAsc:0,
				companySortNameAddress:0,
				notificationSortAsc:0,
				notificationSortDate:0
			},
			pageTittle:""
		}
	}

	componentDidMount() {
		let user = "";

		if(!sessionStorage.getItem("loginStatus")){
			sessionStorage.setItem("token2","");
			sessionStorage.setItem("loginStatus","not logged");
			sessionStorage.setItem("token","");
			sessionStorage.setItem("user","");
			return;
		}

		let usergroup=0;
		let cr =  new Crypto();

		let loginStatus = sessionStorage.getItem("loginStatus");
		let token = sessionStorage.getItem("token");
		let token2 = sessionStorage.getItem("token2");

		if (sessionStorage.getItem("user") != ""){
			user = JSON.parse(sessionStorage.getItem("user"));
		}
		


		if (token2 === cr.returnHash(token + "0" + this.state.salt)){
			usergroup = 0;
			return;
		}
		else if (token2 === cr.returnHash(token + "1" + this.state.salt)){
			usergroup = 1;
		}
		else if (token2 === cr.returnHash(token + "1" + this.state.salt)){
			usergroup = 2;
		}
		else if (token2 === cr.returnHash(token + "3" + this.state.salt)){
			usergroup = 3;
		}
		else {
			this.onLogout();
			return;
		}

		if(loginStatus === "logged") {
			this.setState({
				isLogged:true,
				token:token,
				userGroup:usergroup,
				loggedUser:user
			})
		}
		else{
			this.onLogout();
			return;
		}
	}

	setPageTittle(tittle){
		this.setState({
			pageTittle:tittle
		});
	}

	setUserPropsState(users){
		this.setState({
			userList:users
		});
	}
	setCompanyPropsState(companies){
		this.setState({
			housingCompList:companies
		});
	}

	getHousingCompanies = () => {
		let onGetHousingCompanyList = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
			"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/housingcomp",onGetHousingCompanyList).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						housingCompList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get all users
	getUsers = () => {
		let onGetUser = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/users",onGetUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						userList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// Get users from single housing company   *** backendin haku on tij_flats-taulusta / avaimella id_flats ***
	getUsersByHousingCompany = (id) => {
		let onGetUser = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/usersbycompany/"+id,onGetUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						userList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get one user by id
	getUser = (id) => {
		let onGetUser = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/users/"+id,onGetUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						userList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get houses by housing company id
	getHousesByHousingCompany = (id) => {
		let onGetHouses = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/housesbycompany/"+id,onGetHouses).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						housesList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get flats in building
	getFlatsByHouse = (id) => {
		let onGetFlats = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/flatsbyhouse/"+id,onGetFlats).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						flatsList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// Company name search
	getCompaniesByName = (name) => {
		let onGetCompany = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/companyseek/"+name,onGetCompany).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						housingCompList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// Company address search
	getCompaniesByAddress = (address) => {
		let onGetCompany = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/companyseekaddress/"+address,onGetCompany).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						housingCompList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// username search
	getUsersByName = (name) => {
		let onGetUser = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/usersseek/"+name,onGetUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						userList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}
	// User address search
	getUsersByAddress = (address) => {
		let onGetUser = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/usersseekaddress/"+address,onGetUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						userList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// add one user  = POST
	addUser = (user) => {
		let onAddUser = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(user)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/users/",onAddUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						this.getUsers();
						this.setState({userList:data})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// update a user  = PUT
	updateUser = (user) => {
		let tempUser = user;
		let onUpdUser = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(tempUser)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/users/"+tempUser.id,onUpdUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						this.getUsers();
						this.setState({userList:data})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// update a user by admin  (HUOM: ero URIssa: /users2/)
	updateUserByAdmin = (user) => {
		let tempUser = user;
		let onUpdUser = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(tempUser)
		}
		console.log(onUpdUser)
		fetch(process.env.REACT_APP_POSTPATH+"/api/users2/"+tempUser.id,onUpdUser).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						this.getUsers();
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get all notifications
	getNotifications = () => {
		let onGetNotificationList = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notifications",onGetNotificationList).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						notificationsList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

// get 5 unread notifications
	getNotificationsNew = () => {
		let onGetNotificationList = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notificationsnew",onGetNotificationList).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						notificationsList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}
// get one notification by id
	getNotification = (id) => {
		let onGetNotification = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notifications1/"+id,onGetNotification).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						notificationsList:data
					})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get notifications of one user by status (manager)
	getNotificationsByUidStatus = (uid,status) => {
		let onGetNotificationList = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/apim/notifications/"+uid+"/"+status,onGetNotificationList).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						notificationsList:data

					});
					//console.log(this.notificationsList);
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// get active notifications of one user (resident)
	getNotificationsByUid = (uid) => {
		let onGetNotificationList = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notifications/"+uid,onGetNotificationList).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
					this.setState({
						notificationsList:data

					});
					//console.log(this.notificationsList);
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}
	// add one notification  = POST
	addNotification = (notification) => {
		let onAddNotification = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(notification)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notifications/",onAddNotification).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						this.getNotifications();
						this.setState({notificationsList:data})
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// update a notification  = PUT
	updateNotification = (notification) => {
		let tempNotif = {
			id:notification.id,
			checkout_message:notification.comment,
			uid:this.state.loggedUser.id
		};
		let onUpdNotification = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(tempNotif)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notifications/"+tempNotif.id,onUpdNotification).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						
					if(notification.page==="etusivu")
					{
						this.getNotificationsNew();
					}
					if(notification.page==="lista")
					{
						this.getNotifications();
					}
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	// update a notification status
	updateNotificationStatus = (id,status,param1) => {
		let onUpdNotification = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/api/notificationstatus/"+id+"/"+status,onUpdNotification).then((response) => {
			if(response.ok) {
				console.log("Status updated");
				if(param1 === 0){
					this.getNotifications();
				}
				else{
					this.getNotificationsNew();
				}
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}
	// update housing company by id
	updateHousingCompany = (comp) => {
		let tempComp = comp;
		let onUpdateHc = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
					body:JSON.stringify(tempComp)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/apim/housingcomp/"+comp.id,onUpdateHc).then((response) => {
			if(response.ok) {
				console.log("Housing company updated.");
				this.getHousingCompanies();
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}
	addHousingCompany = (housingcompany) => {
		let onAddHousingCompany= {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					"token":this.state.token},
			body:JSON.stringify(housingcompany)
		}
		fetch(process.env.REACT_APP_POSTPATH+"/apim/housingcompany/",onAddHousingCompany).then((response) => {
			if(response.ok) {
				response.json().then((data) => {
						/*this.getNotifications();
						this.setState({notificationsList:data})*/
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	onLogin = (user) => {
		let usergroup=0;
		let cr =  new Crypto();

		let onLogin = {
			method:"POST",
			headers:{"Content-Type":"application/json",mode:"cors",},
			body:JSON.stringify({
				"uname":user.uname,
				"passphrase":user.passphrase
			})
		}
		fetch(process.env.REACT_APP_POSTPATH+"/login",onLogin).then((response) => {
			if(response.ok) {
				response.json().then((data) => {

					if (data.token2 === cr.returnHash(data.token + "0" + this.state.salt)){
						usergroup = 0;
					}
					else if (data.token2 === cr.returnHash(data.token + "1" + this.state.salt)){
						usergroup = 1;
					}
					else if (data.token2 === cr.returnHash(data.token + "1" + this.state.salt)){
						usergroup = 1;
					}
					else if (data.token2 === cr.returnHash(data.token + "3" + this.state.salt)){
						usergroup = 3;
					}

					//let userTemp = Object.keys(data.user).map(function (i) {
					//	return data.user[i];
					 // });

					 let userTemp = data.user;

					this.setState({
						token:data.token,
						userGroup:usergroup,
						isLogged:true,
						loggedUser:userTemp
					})
					sessionStorage.setItem("user",JSON.stringify(userTemp));
					sessionStorage.setItem("token",data.token);
					sessionStorage.setItem("token2",data.token2);
					sessionStorage.setItem("loginStatus","logged");
				})
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		})
	}

	onLogout = () => {
		console.log("logout");
		let onLogout = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					 "token":this.state.token}
		}
		fetch(process.env.REACT_APP_POSTPATH+"/logout",onLogout).then((response) => {
			if(response.ok) {
				this.setState({
					token:"",
					userGroup:0,
					isLogged:false
				})
				sessionStorage.setItem("token2","");
				sessionStorage.setItem("loginStatus","not logged");
				sessionStorage.setItem("token","");
				sessionStorage.setItem("user","");
			} else {
				console.log(response.statusText);
			}
		}).catch((error) => {
			console.log(error);
		})
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<ContainerTop
									userGroup={this.state.userGroup}
					 				onLogout={this.onLogout}
									loggedUser={this.state.loggedUser}/>
					<ContainerMid pageTittle={this.state.pageTittle}/>
					{this.state.isLogged === false &&
					<Login onLogin={this.onLogin}/>
					}
					{this.state.isLogged === true &&
					<ContainerContents setPageTittle={this.setPageTittle}
									   setUserPropsState={this.setUserPropsState}
									   setCompanyPropsState={this.setCompanyPropsState}

									   getNotifications={this.getNotifications}
									   getNotificationsNew={this.getNotificationsNew}
									   getNotificationsByUidStatus={this.getNotificationsByUidStatus}
									   getNotificationsByUid={this.getNotificationsByUid}
									   getUsers={this.getUsers}
									   getHousingCompanies={this.getHousingCompanies}
									   getUsersByName={this.getUsersByName}
									   getUsersByAddress={this.getUsersByAddress}
									   getCompaniesByName={this.getCompaniesByName}
									   getCompaniesByAddress={this.getCompaniesByAddress}
									   getUsersByHousingCompany={this.getUsersByHousingCompany}
									   getFlatsByHouse={this.getFlatsByHouse}
									   getHousesByHousingCompany={this.getHousesByHousingCompany}

									   addNotification={this.addNotification}
									   addUser={this.addUser}
									   addHousingCompany={this.addHousingCompany}

									   updateNotification={this.updateNotification}
									   updateNotificationStatus={this.updateNotificationStatus}
									   updateUser={this.updateUser}
									   updateUserByAdmin={this.updateUserByAdmin}
									   updateHousingCompany={this.updateHousingCompany}

									   onLogin={this.onLogin}
									   onLogout={this.onLogout}

									   notificationsList={this.state.notificationsList}
									   userList={this.state.userList}
									   flatsList={this.state.flatsList}
									   housesList={this.state.housesList}
									   housingCompList={this.state.housingCompList}
									   loggedUser={this.state.loggedUser}

									   sortSettings={this.state.sortSettings}

									   isLogged={this.state.isLogged}
									   userGroup={this.state.userGroup}
									   token={this.state.token}
										/>
					}
				</div>
			</div>
		);
	}
}
