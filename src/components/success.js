import React from 'react';
import axios from '../axios/index';

class success extends React.Component{
	constructor(props) {
		super(props);
		this.state = { number:0 };
	}
	componentDidMount(){

		
	}
	count(name){
		axios.get('/hh/rcprorecord/count?name='+name).then(res=>{
			console.log(res)
			if(res.status===200){
				let _number = 0;
				res.data ? _number=res.data:_number = 0;
				this.setState({
					number:_number
				})
			}
		})
	}
	
	render(){
		return (
			<div  style={ this.props.success ? {display: 'block'} : { display: 'none'} }>
				<div className="shdown"></div>
				<div className="success-content absolute-center">
					<div className="success" id="success" style={this.props.imgSrc ? {display:'none'}:{display:'block'} }>,
						<div className="success-name">爱心人士，</div>
						<div className="success-text">您已成功结对捐助{this.props.number+this.props.num }位学生</div>
						
						<img className="success-img" src="./img/success2.png" alt="" />
						
					</div>
					<img src={this.props.imgSrc} className="success"  style={this.props.imgSrc ? {display:'block'}:{display:'none'} } />
					<div className="save">
						<div>长按图片,保存到手机</div>
						<img onClick={()=>{this.props.closeDialog()}} className="save-close" src="./img/close2.png" />
					</div>
					
				</div>

			</div>
		)
	}
}

export default success