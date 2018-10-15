import React from 'react';

class Totop extends React.Component{
	backTop(){
		window.scrollTo(0,0);
	}
	render(){
		return (
			<div onClick={this.backTop} style={ this.props.showtop ? {display: 'block'} : { display: 'none'} } className="to-top">↑</div>
		)
	}
}


export default Totop