import React from 'react';
import Header from './components/header'
import Navs from './components/navs'
import Footer from './components/footer'
import Totop from './components/totop'
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showtop:false};
	}
	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll.bind(this));
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
