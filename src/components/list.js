import React from 'react';
import ListItem from './listItem'
import Dialog from './dialog'
import axios from '../axios/index';
import emitter from "./event"
class List extends React.Component{
	constructor(props) {
		super(props);
		this.state = { rcprochild: [],currentindex:999,visible:false,checkindex:999,hasCheck:false,pk:0,amount:0};
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
				this.setState({
					rcprochild:res.data.data.items
				})
			}
		})
	}
	checkChild(pk,amount,index){
		if(this.state.hasCheck){
			this.setState({
				checkindex:999,
				hasCheck:false
			})
		}else{
			this.setState({
				checkindex:index,
				hasCheck:true,
				pk:pk,
				amount:amount
			})
		}
		

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