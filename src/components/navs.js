import React from 'react'

class Navs extends React.Component{
	render(){
		return(
			<div className="list-navs clearfix box-sizing">
				<div className="list-nav fl list-nav-active">结对学生</div>
				<div className="list-nav fl">项目详情</div>
				<div className="list-nav fl">项目进展</div>
			</div>
		)
	}
}

export default Navs