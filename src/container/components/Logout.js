import React from 'react';

export default class Logout extends React.Component {

  componentDidMount() {
    this.props.onLogout();
    console.log("aa")
}


  render() {
    return (
		<div>Logout</div>
    );
  }
}
