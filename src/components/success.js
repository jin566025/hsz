import React from 'react';
import axios from '../axios/index';
class success extends React.Component{
	constructor(props) {
		super(props);
		this.state = { number:0 };
	}
	componentDidMount(){
		this.count(this.props.donaername);
		console.log(this.props.bianhao)
	}
	count(name){
		axios.get('/hh/rcprorecord/count').then(res=>{
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
					<div className="success">
						<div className="success-name" style={ this.props.donaername ? {display: 'block'} : { display: 'none'} }>{ this.props.donaername}</div>
						<div className="success-text" style={ this.props.donaername ? {display: 'block'} : { display: 'none'} }>您已成功捐助{this.state.number}位学生</div>
						<div className="success-title">"博爱甬城·助您黔程"甬城名都,助学·筑梦·筑人</div>
						<img className="success-img" src="./img/success.jpg" alt="" />
						<div className="erweima-content flex-box">
							<img className="erweima-img" src="./img/erweima.png" />
							<div className="erweima-texts">
								<div className="erweima-text">长按识别二维码</div>
								<div className="erweima-text">传递爱心正能量,甬城名都人道·博爱·奉献</div>
							</div>
						</div>
					</div>
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