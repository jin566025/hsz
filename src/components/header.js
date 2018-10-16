import React from 'react';
import { Carousel } from 'antd';
import axios from '../axios/index';
import emitter from "./event"
// import axios from 'axios';
class Header extends  React.Component{
	
	constructor(props) {
		super(props);
		this.state = { items: [],num:"0"};
	}
	componentDidMount(){
    this.ad();
		this.rcprochild()
	}
	ad(){
		axios.get('/sys/ad/page').then(res=>{
				if(res.status===200){
					this.setState({
						items:res.data.data.items
					})
				}
		})
	}
	rcprochild(){
		axios.get('/hh/rcprochild/list').then(res=>{
				if(res.status===200){
					let lists = res.data.data.items;
					let length = 0;
					lists.forEach((ele,i)=>{
						if(ele.statNm=="已完成"){
							length++;
						}
					})
					this.setState({
						num:length
					})
				}
		})
	}
	searchRcprochild(){
		
	}
	changeEvent(e){
		console.log(e.target.value);
				let value= e.target.value;
				let url = '/hh/rcprochild/list'
				let query = "";
				if(value){
					query = {"w":[{"k":"childNo","v":e.target.value,"m":"LK"}],"o":[],"p":{"n":1,"s":10}};
					query = JSON.stringify(query);
					query = encodeURI(query)
					url = '/hh/rcprochild/list?query='+query
				}
				
				axios.get(url).then(res=>{
						console.log(res)
						if(res.status===200){
							let lists = res.data.data.items;
							emitter.emit("callMe",lists)		
						}
				})
	}
	render(){
		return (
			<div>
				<div className="shadow"></div>
				<input style={{color:"#fff"}} className="search box-sizing" placeholder="请输入编号" type="tel" onChange={this.changeEvent} />
				<div className="container">
					<div  className="banner">

						<Carousel autoplay  effect="fade">
								{this.state.items.map((item,index) => (
									<div  key={index} ><img alt={item.nm} className="banner-img" src={item.srcUrl}  / ></div>
								))}

							
					  </Carousel>
					</div>
					<div className="banner-content clearfix">
						<div className="banner-content-left fl">
							<p className="banner-title">“博爱甬城·助您黔程”结对助学</p>
							<p className="banner-title2">公募机构：宁波市红十字会</p>
						</div>
						<div className="banner-content-right fr">
							<p className="banner-title3">累计帮扶</p>
							<p className="banner-title4">{this.state.num}位</p>
						</div>
					</div>
				</div>
				<div className="header-tip">捐赠1000-3000元，资助一名贵州省黔西南州寒门学子，帮助他们克服家庭困难，顺利完成学业。</div>
				<div className="split"></div>
			</div>
		)
	}
}
export default Header