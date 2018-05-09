import React from 'react';
import TopMenu from './components/TopMenu';


export default class ContainerTop extends React.Component {
  render() {
    return (

		  <TopMenu userGroup={this.props.userGroup}
                onLogout={this.props.onLogout}
                loggedUser={this.props.loggedUser}/>

    );
  }
}
