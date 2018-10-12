import React from 'react';
import { Carousel } from 'antd';
class Header extends  React.Component{
	render(){
		return (
			<div>
				<div className="shadow"></div>
				<input className="search box-sizing" placeholder="请输入编号" type="text" />
				<div className="container">
					<div  className="banner">
						<Carousel autoplay  effect="fade">
							<div><img alt="" className="banner-img" src="/img/test.png"  / ></div>
							<div><img alt="" className="banner-img" src="/img/test2.png"  / ></div>
							<div><img alt="" className="banner-img" src="/img/test.png"  / ></div>
					  </Carousel>
					</div>
					<div className="banner-content clearfix">
						<div className="banner-content-left fl">
							<p className="banner-title">"博爱甬城助您黔程"结对助学</p>
							<p className="banner-title2">公募机构：宁波市红十字会</p>
						</div>
						<div className="banner-content-right fr">
							<p className="banner-title3">累计帮扶</p>
							<p className="banner-title4">22位</p>
						</div>
					</div>
				</div>
				<div className="header-tip">宁波市红十字会援梦行动帮扶黔西南州小学、初中及高中寒门学子，上学路上感谢有你！</div>
				<div className="split"></div>
			</div>
		)
	}
}
export default Header