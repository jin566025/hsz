import React from 'react';
import Header from './components/header'
import List from './components/list'
import Navs from './components/navs'
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [0,0,0,0],currentIndex:1};
	}
	cancel(index){
		this.setState({
			currentIndex:index
		})
	}
	toTop(index){
		this.setState({
			currentIndex:999
		})
	}
  render() {
    return (
      <div className="content">
				 <Header />
				 <Navs />
				 <List toTop={flag=>this.toTop(flag)}  cancel={mode=>this.cancel(mode)} items={this.state.items} currentIndex={this.state.currentIndex} />
      </div>
    );
  }
}

export default App;
