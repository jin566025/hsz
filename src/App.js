import React from 'react';
import Header from './components/header'
import Navs from './components/navs'
import Footer from './components/footer'
class App extends React.Component {

	componentDidMount(){
		
	}

  render() {
    return (
      <div className="content">
			
				<Header />
				<Navs  history ={this.props.history}  />
				 
				<Footer></Footer>
				
      </div>
    );
  }
}

export default App;
