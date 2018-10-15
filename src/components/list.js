import React from 'react';
import ListItem from './listItem'
import Dialog from './dialog'
import axios from '../axios/index';
import emitter from "./event"
class List extends React.Component{
	constructor(props) {
		super(props);
		this.state = { rcprochild: [],currentindex:999,visible:false,checkindex:999,hasCheck:false,pk:[],amount:0};
		this.submitgo = this.submitgo.bind(this);
	}
	cancel(index){
		this.setState({
			currentindex:index
		})
	}
	totop(index){
		this.setState({
			currentindex:999
		})
	}
	
	componentDidMount(){
		this.rcprochild();
		this.eventEmitter = emitter.addListener("callMe",(msg)=>{
            this.setState({
				rcprochild:msg
			})
        });
	}

	submitgo(){
		if(this.state.hasCheck){
			this.setState({
				visible:true
			})
		}else{
			alert("请选择援助的学生")
		}
		
	}
	close(){
		this.setState({
			visible:false
		})
	}
	
	rcprochild(){
		axios.get('/hh/rcprochild/list').then(res=>{
			if(res.status===200){
				let items = res.data.data.items;
				items.forEach((ele,i)=>{
					ele.check = false;
				})
				this.setState({
					rcprochild:items
				})
			}
		})
	}
	checkChild(pk,amount,index){
// 		
// 		if(this.state.rcprochild[index].check){
// 			
// 		}else{
// 			this.setState({
// 				checkindex:index,
// 				pk:pk,
// 				amount:amount
// 			})
// 		}
		let price = amount;
		let _amount = this.state.amount;
		let pks = this.state.pk;
		let _index = pks.indexOf(pk);
		let hasCheck  = this.state.hasCheck;
		if(this.state.rcprochild[index].check){
			pks.splice(_index,1);
			_amount = _amount-price;
			if(pks.length==0){
				hasCheck=false
			}
		}else{
			_amount = _amount+price;
			pks.push(pk);
			hasCheck=true
		}
		this.state.rcprochild[index].check = !this.state.rcprochild[index].check;
		this.setState({
			rcprochild:this.state.rcprochild,
			pk:pks,
			amount:_amount,
			hasCheck:hasCheck
		})
	}

	render(){
		return(
			<div>
				<div style={ this.state.rcprochild.length===0 ? {display: 'none'} : { display: 'block'} }>
					{this.state.rcprochild.map((item,index) => (
						<div  key={index} >
							<ListItem checkindex={this.state.checkindex} checkChild={(pk,amount,index)=>this.checkChild(pk,amount,index)} totop={flag=>this.totop(flag)}  cancel={mode=>this.cancel(mode)} items={item} currentindex={this.state.currentindex} index={index}></ListItem>
						</div>
					))}
				</div>
				<div className="nodata" style={ this.state.rcprochild.length===0 ? {display: 'block'} : { display: 'none'} }>--------暂无数据--------</div>
				<div className="bianhap">{this.props.bianhao}</div>
				<div className="submit-btn submit-btn3" onClick={ this.submitgo }>确认捐助</div>
				<div className="zanwei"></div>
				<Dialog close={()=>this.close()} pk={this.state.pk}  amount={this.state.amount}  visible={ this.state.visible  }></Dialog>
			</div>
		)
	}
}
export default List