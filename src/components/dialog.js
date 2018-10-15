import React from 'react'
import Success from './success'
import axios from '../axios/index'
import $ from "jquery"
class dialog extends React.Component{
	constructor(props) {
		super(props);
		this.state = { dislog:false,success:false,donaername:"" };
		this.tabCheck = this.tabCheck.bind(this);
		this.donation = this.donation.bind(this);
	}
	tabCheck(){
		this.setState({
			dislog:!this.state.dislog
		})
	}
	isWeixn(){
		let ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	aliPay(tel,name,address,amount,pk){
		
		let params = {
			"cd":"HH_ALIPAY",
			"subject":"child",
			"totalAmount":amount,
			"rcProPk":"4101218502661120",
			"rcProChildPk":pk,
		}
		let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if(phoneReg.test(tel)){
			params.phone=tel
		}else{
			alert("请输入有效的手机号码！");
			return false;
		}
		name ? params.name = name:params.name = "未填";
		address ? params.addr = address:params.address = "未填";
		
		
		let that = this;
		
		$.ajax({
			type:"post",
			url:"http://nbhh.xlylai.com/pay/alipay/createOrder",
			data:params,
			async:false,
			success:function(res){
				console.log(res)
				if(res.status==="200"){
					
					that.checkOrder(res.data.outTradeNo,name)
					//window.location.href=res.data.qrCode
				}
			}
		})
// 		axios({
// 			url:'/pay/alipay/createOrder',
// 			type:'POST',
// 			data:params,
// 			dataType:'json'
// 		}).then(res=>{
// 			console.log(res)
// 
// 		})

	}
	checkOrder(ordNo,name){
		let query = {"w":[{"k":"ordNo","v":ordNo,"m":"LK"}],"o":[],"p":{"n":1,"s":10}};
		query = JSON.stringify(query);
		query = encodeURI(query);
		let that = this;
		$.ajax({
			type:"get",
			url:"http://nbhh.xlylai.com:8812/hh/rcprorecord/page?query="+query,
			async:false,
			success:function(data){
				if(data.status==200){
					if(data.data.items[0].statNm=="订单未支付"){
						setTimeout(()=>{
							that.checkOrder(ordNo,name)
						},3000)
					}else{
						that.setState({
							success:true,
							donaername:name
						})
					}
				}
			}
		})
	}
	donation(){
		let tel = this.refs.tel.value;
		let name = this.refs.name.value;
		let address = this.refs.address.value;
		
		if(this.isWeixn()){
			
		}else{
			this.aliPay(tel,name,address,this.props.amount,this.props.pk)
		}
	}
	closeDialog(){
		this.setState({
			success:false
		})
	}
	render(){
		return(
			<div style={ this.props.visible ? {display: 'block'} : { display: 'none'} }>
				<div className="shdown"  style={ this.state.success ? {display: 'none'} : { display: 'block'} }></div>
				<div className="dialog-content"  style={ this.state.success ? {display: 'none'} : { display: 'block'} }>
					<div className="dialog-header clearfix">
						<div className="dialog-header-left fl">请确认捐款金额</div>
						<div className="dialog-header-right fr" onClick={()=>{this.props.close()}}></div>
					</div>
					<div className="dialog-main">
						<div className="dialog-title">确认捐款共计{this.props.amount}元</div>
						<input type="tel" ref="tel" className="dialog-input dialog-input-tel box-sizing" placeholder="请输入联系方式" />
						<div className={`flex-box dialog-checks align-center ${this.state.dislog ? 'dialog-check-active':''} `} onClick={this.tabCheck}>
							<div className="dialog-check "></div>
							<div className="dialog-text dialog-text1">寄送捐赠证书和发票</div>
						</div>
						<div style={ this.state.dislog ? {display: 'block'} : { display: 'none'} } >
							<input type="text"  ref="name" className="dialog-input dialog-input-name box-sizing" placeholder="请输入姓名" />
							<input type="text"  ref="address" className="dialog-input dialog-input-address box-sizing" placeholder="请输入地址" />
							<div className="dialog-checks ">
								<div className="dialog-text">温馨提示：为方便您办理公益捐赠抵税手续，请正确填写姓名,如为企业捐赠，填写单位全称即可。</div>
							</div>
						</div>
						<div className="submit-btn submit-btn2" onClick={this.donation}>立即捐款</div>
						
					</div>
				</div>
				<Success donaername={this.state.donaername} closeDialog={()=>this.closeDialog()} success={this.state.success}></Success>
			</div>
		)
	}
}

export default dialog