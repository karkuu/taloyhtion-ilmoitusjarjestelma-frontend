import React from 'react';

export default class ContainerMid extends React.Component {
  render() {
    return (
    	<div className="jumbotron">
    		<h1>Taloyhtiön Ilmoitusjärjestelmä</h1>
    		<p>{this.props.pageTittle}</p>
    	</div>
    );
  }
}
