import React from 'react'
import Detail from './detail'
import Progress from './progress'
import List from './list'
import { HashRouter,Route,Switch,NavLink } from 'react-router-dom';

class Navs extends React.Component{

	render(){
		return(
		<div>
			<HashRouter >
				<div>
					<div className="list-navs clearfix box-sizing">
						<NavLink className="list-nav fl " exact to='/' >结对学生</NavLink>
						<NavLink className="list-nav fl" exact to='/detail' >项目详情</NavLink>
						<NavLink className="list-nav fl" exact to='/Progress' >项目进展</NavLink>
					</div>
					
					<Switch>
						<Route bianhao={this.props.bianhao} exact path='/' component={List} />
						<Route exact path='/detail' component={Detail} />
						<Route exact path="/Progress" component={Progress}/>
					</Switch>
				</div>
			</HashRouter>

		</div>
		)
	}
}

export default Navs