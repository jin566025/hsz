import React from 'react';
import Header from './components/header'
import Navs from './components/navs'
import Footer from './components/footer'
import Totop from './components/totop'
import axios from './axios/index';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showtop:false};
	}
	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll.bind(this));
		this.login()
		
	}
	login(){
		if(this.isWeixn()){
			let hasLogin = sessionStorage.getItem("hasLogin");
			let openid = sessionStorage.getItem("openid");
			if(hasLogin){
				let _url = window.location.href.split("code=")[1];
				console.log(_url)
				let code = _url.split("&")[0];
				axios.get('/weixin/access/login?code='+code).then(res=>{
					console.log(res)
					sessionStorage.setItem("openid",res.data.openid);
				})
			}else{
				window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb9a1996af082db32&redirect_uri=http://nbhhweb.xlylai.com/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
				sessionStorage.setItem("hasLogin",true)
			}
			
		}
	}
	isWeixn(){
		let ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	handleScroll(e) {
//     this.setState({
//     	showtop:true
//     })
// 		var timer;
// 		clearTimeout(timer)
// 		timer = setTimeout(()=>{
// 			
// 			this.setState({
// 				showtop:false
// 			})
// 		},3000)
		
  }
	
  render() {
    return (
      <div className="content">
			
				<Header />
				<Navs  history ={this.props.history}  />
				 
				<Footer></Footer>
				<Totop showtop={this.state.showtop} ></Totop>
      </div>
    );
  }
}

export default App;
