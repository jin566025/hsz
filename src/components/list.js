import React from 'react';
import ListItem from './listItem'
class List extends React.Component{
	constructor(props) {
		super(props);
		this.state = { items: [0,0,0,0],currentindex:1};
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
	componentWillUnmount(){
		console.log("aaa")
	}
	render(){
		return(
			<div>
				
				{this.state.items.map((item,index) => (
					<div  key={index} >
						<ListItem totop={flag=>this.totop(flag)}  cancel={mode=>this.cancel(mode)} items={this.state.items} currentindex={this.state.currentindex} index={index}></ListItem>
					</div>
				))}
				
			</div>
		)
	}
}
export default List