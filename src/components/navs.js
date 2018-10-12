import React from 'react'
import Detail from './detail'
import Progress from './progress'
import List from './list'
import { BrowserRouter,Route,Switch,NavLink } from 'react-router-dom';

class Navs extends React.Component{
	
	todetail(){
		window.location.href="/detail"
	}
	toindex(){
		window.location.href="/"
	}
	toprogress(){
		window.location.href="/progress"
	}
	render(){
		return(
		<div>
			<BrowserRouter history={BrowserRouter}>
				<div>
					<div className="list-navs clearfix box-sizing">
						<NavLink className="list-nav fl " exact to='/' >结对学生</NavLink>
						<NavLink className="list-nav fl" exact to='/detail' >项目详情</NavLink>
						<NavLink className="list-nav fl" exact to='/Progress' >项目进展</NavLink>
					</div>
					
					<Switch>
						<Route exact path='/' component={List} />
						<Route exact path='/detail' component={Detail} />
						<Route exact path="/Progress" component={Progress}/>
					</Switch>
				</div>
			</BrowserRouter>

		</div>
		)
	}
}

export default Navs