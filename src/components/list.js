import React from 'react';
import ListItem from './listItem'
class List extends React.Component{
	render(){
		return(
			<div>
				
				{this.props.items.map((item,index) => (
				
					<div key={index} className="item" index={index} >
						<div className="item-content flex-box">
							<div className="item-content-left ">
								<img className="item-img"  alt="" src="./img/male.png" />
							</div>
							<div className="item-content-right flex1">
								<div className="item-content-name flex-box">
									<p className="item-name  flex1">001张*然</p>
									<div className="item-check " style={ this.props.currentIndex===index ? {backgroundColor: '#D03B27'} : { backgroundColor: '#999999'} }></div>
								</div>
								
								<p className="item-msg">
									<span className="item-msg-age">年龄：8岁</span>
									<span>性别：男</span>
								</p>
								<p className="item-msg">贵州省黔西南州XXXXX小学四年级</p>
								<p className="item-msg2">捐助金额<span className="item-msg-price">2000元</span></p>
								<p className="item-more" onClick={()=>{this.props.cancel(index)}} style={ this.props.currentIndex===index ? {display: 'none'} : { display: 'block'} }><img alt="" className="top-icon" src="./img/bottom.png" />展开基本信息</p>
								
							</div>
						</div>
						
						<div className="itme-more-text" style={ this.props.currentIndex===index ? {display: 'block'} : { display: 'none'} }>
							<p className="more-title">家庭情况：</p>
							<p className="more-detail">分的高分技能你不：是我好久开始看上看看什么你：不是还是比较：好吧钣金设计顺利开机时间：我你你手机就是难受：客人来访</p>
							<p  onClick={()=>{this.props.toTop(index)}} className="item-more2" ><img alt="" className="top-icon" src="./img/top.png" />收起</p>
						</div>
					</div>
					
				))}
				
			</div>
		)
	}
}
export default List