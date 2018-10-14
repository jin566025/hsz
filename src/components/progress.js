import React from 'react';

import axios from '../axios/index';
class progress extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = { rcproprog: [] };
	}
	
	componentDidMount(){
		this.rcproprog()
	}
	rcproprog(){
		axios.get('/hh/rcproprog/list').then(res=>{
			if(res.status===200){
				this.setState({
					rcproprog:res.data.data.items
				})
			}
		})
	}
	render(){
		return(
			<div>
				<div style={ this.state.rcproprog.length===0 ? {display: 'none'} : { display: 'block'} }>
					{this.state.rcproprog.map((item,index) => (
						<div  key={index} className="progress-section flex-box">
							<div  className="progress-section-left">
								<div className="red-circle"></div>
							</div>
							<div  className="progress-section-right flex1">
								<div className="progress-section-time">{item.hapTm}</div>
								<div className="progress-section-time">由项目管理团队发布</div>
								<div className="progress-section-content box-sizing" dangerouslySetInnerHTML={{__html:item.des}}></div>
							</div>
						</div>
					))}
				</div>
				<div className="progressTip" style={ this.state.rcproprog.length===0 ? {display: 'block'} : { display: 'none'} }>公募结束后可查看捐赠资金使用情况</div>
			</div>
		)
	}
}
export default progress