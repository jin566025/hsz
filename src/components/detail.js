import React from 'react';
import axios from '../axios/index';
class detail extends React.Component{
	constructor(props) {
		super(props);
		this.state = { details: {} };
	}
	componentDidMount(){
		this.rcpro()
	}
	rcpro(){
		axios.get('/hh/rcpro/info/4101218502661120').then(res=>{
			if(res.status===200){
				console.log(res.data.data)
				this.setState({
					details:res.data.data
				})
			}
		})
	}
	createMarkup(){
		return {__html: '<h1>测试</h1>'};
	}
	
	render(){
		return (
			<div className="detail-content">
				<div className="a"></div>
				<div className="detail-content"  dangerouslySetInnerHTML={{__html:this.state.details.des}}></div>
			</div>
		)
	}
}

export default detail;