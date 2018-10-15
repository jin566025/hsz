import React from 'react'
import Success from './success'
import axios from '../axios/index'
import $ from "jquery"
let wx = require('weixin-js-sdk');
class dialog extends React.Component{
	constructor(props) {
		super(props);
		this.state = { dislog:false,success:false,donaername:"",number:0 };
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
	aliPay(params,tel,name,address,amount,pk){
		
		
		
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
					window.location.href=res.data.qrCode
				}
			}
		})
	}
	weixinPay(params){
		let _params = {};
		
		_params.cd = params.cd;
		_params.totalFee = params.totalAmount;
		_params.phone = params.phone;
		_params.name = params.name;
		_params.array = params.array;
		_params.rcProPk = params.rcProPk;
		_params.body = params.subject
		
		_params.openid = sessionStorage.getItem("openid");
		_params.tradeType = "JSAPI";
		
		$.ajax({
			type:"post",
			url:"http://nbhh.xlylai.com/pay/weixin/createOrder",
			data:_params,
			async:false,
			success:function(res){
				console.log(res)
				if(res.status==="200"){
// 					WeixinJSBridge.invoke(
// 						'getBrandWCPayRequest', {
// 							"appId":res.appId,               //公众号名称，由商户传入     
// 							"timeStamp":res.timeStamp,       //时间戳，自1970年以来的秒数     
// 							"nonceStr":res.nonceStr,         //随机串     
// 							"package":res.packageValue,     
// 							"signType":res.signType,         //微信签名方式：     
// 							"paySign":res.paySign               //微信签名 
// 						},
// 						function(res){
// 							console.log(res)
// 							if(res.err_msg == "get_brand_wcpay_request:ok" ) {
// 								//that.checkOrder(ordNo,name)
// 							}
// 						}
// 					); 
				}
			}
		})
	}
	checkOrder(ordNo,name){
		let query = {"w":[{"k":"ordNo","v":ordNo,"m":"LK"}],"o":[],"p":{"n":1,"s":10}};
		query = JSON.stringify(query);
		query = encodeURI(query);
		let that = this;
		$.ajax({
			type:"get",
			url:"http://nbhh.xlylai.com/hh/rcprorecord/page?query="+query,
			async:false,
			success:function(data){
				
				if(data.status==200){
					console.log(data)
					if(data.data.items[0]){
						that.setState({
							success:true,
							donaername:name
						})
					}else{
						setTimeout(()=>{
							that.checkOrder(ordNo,name)
						},3000)
					}
				}
			}
		})
		$.ajax({
			type:"get",
			url:"http://nbhh.xlylai.com/hh/rcprorecord/count?name="+name,
			async:false,
			success:function(data){
				let _number = 0;
				data ? _number=data:_number = 0;
				that.setState({
					number:_number
				})
			}
		})
	}

	donation(){
		let tel = this.refs.tel.value;
		let name = this.refs.name.value;
		let address = this.refs.address.value;
		let pk = this.props.pk.join(",");
		let params = {
			"cd":"HH_ALIPAY",
			"subject":"child",
			"totalAmount":this.props.amount,
			"rcProPk":"4101218502661120",
			"array":pk,
		}
		console.log()
		let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		if(phoneReg.test(tel)){
			params.phone=tel
		}else{
			alert("请输入有效的手机号码！");
			return false;
		}
		name ? params.name = name:params.name = "未填";
		address ? params.addr = address:params.address = "未填";
		
		if(this.isWeixn()){
			this.weixinPay(params)
		}else{
			this.aliPay(params,tel,name,address,this.props.amount,this.props.pk)
		}
	}
	closeDialog(){
		this.setState({
			success:false
		})
		window.location.reload();
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
				<Success number={this.state.number} donaername={this.state.donaername} closeDialog={()=>this.closeDialog()} success={this.state.success}></Success>
			</div>
		)
	}
}

export default dialog