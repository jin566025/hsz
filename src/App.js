import React from 'react';
import Header from './components/header'
import Navs from './components/navs'

class App extends React.Component {
	
	state = {
			data: ['1', '2', '3'],
			imgHeight: 176,
		}
		componentDidMount() {
			// simulate img loading
			setTimeout(() => {
				this.setState({
					data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
				});
			}, 100);
		}
  render() {
    return (
      <div className="content">
			
				 <Header />
				 <Navs  history ={this.props.history}  />
				 
				
      </div>
    );
  }
}

export default App;
