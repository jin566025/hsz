import React from 'react';

class ListItem extends React.Component{
	componentDidMount(){
		
	}
	render(){
		return(
			<div className="item">
				<div className="item-content flex-box">
					<div className="item-content-left ">
						<img className="item-img"  alt="" src={this.props.items.imgUrl ? this.props.items.imgUrl:"./img/male.png"} />
					</div>
					<div className="item-content-right flex1">
						<div className="item-content-name flex-box">
							<p className="item-name  flex1">{this.props.items.childNo} {this.props.items.rcProChildName} </p>
							<div style={ this.props.items.check ? {backgroundColor: '#CE3B27'} : { backgroundColor: '#999'} }  className={`item-check  ${this.props.items.statNm==="未完成" ? 'show' : 'hide'}`} onClick={()=>{this.props.checkChild(this.props.items.rcProChildPk,this.props.items.amount,this.props.index)}}></div>
							<div className={`item-check2  ${this.props.items.statNm==="未完成" ? 'hide' : 'show'}`}>已结对</div>
						</div>
						
						<p className="item-msg">
							<span className="item-msg-age">年龄：{this.props.items.age}岁</span>
							<span>性别：{this.props.items.sex==="1" ? `男`:`女`}</span>
						</p>
						<p className="item-msg">{this.props.items.proNm} {this.props.items.cityNm} {this.props.items.school}</p>
						<p className="item-msg2">捐助金额<span className="item-msg-price">{this.props.items.amount}元</span></p>
						<p className="item-more"  onClick={()=>{this.props.cancel(this.props.index)}} style={ this.props.currentindex===this.props.index ? {display: 'none'} : { display: 'block'} }><img alt="" className="top-icon" src="./img/bottom.png" />展开基本信息</p>
						
					</div>
				</div>
				
				<div className="itme-more-text" style={ this.props.currentindex===this.props.index ? {display: 'block'} : { display: 'none'} }>
					<div className="more-title">家庭情况：</div>
					<div className="more-detail">{this.props.items.family}</div>
					<div onClick={()=>{this.props.totop(this.props.index)}}  className="item-more2" ><img alt="" className="top-icon" src="./img/top.png" />收起</div>
				</div>
				
			</div>
		)
	}
}
export default ListItem