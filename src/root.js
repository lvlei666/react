import './css/style.css';
import './css/reset.css';
// import 'antd/dist/antd.css';//文件太大，不引入，用less
import React from 'react';
import ReactDom from 'react-dom';
import {Router,Route,hashHistory} from 'react-router'
import IndexComponent from './components/index/index.js';
import DetailComponent from './components/detail/index.js';
// import TouchIndexComponent from './components/touch/index.js';
// import TouchDetailComponent from './components/touch/detail.js';
// import MediaQuery from 'react-responsive';

class Root extends React.Component {
	
	handleEnter(nextState,replaceState) {
		// console.log(arguments)
		try {
			if (window.localStorage && !window.localStorage.login) {
				replaceState({ pathname:'/'})
			}
		}catch(e) {}

		
	}
	render() {
		return(
			<div className="main">
				<Router history={hashHistory}>
					<Route path="/" component={IndexComponent}></Route>
					<Route path="/detail/:id" onEnter={this.handleEnter} component={DetailComponent}></Route>
				</Router>
			</div>
		)
	}
}

ReactDom.render(<Root />,document.querySelector("#root"))
