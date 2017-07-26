import React from 'react';
// import {router} from 'react-router';
import HeaderComponent from '../common/header.js';
import FooterComponent from '../common/footer.js';
import ContentComponent from './content.js';


export default class IndexComponent extends React.Component {
	
	componentDidMount() {
		this.props.router.setRouteLeaveHook(this.props.route,this.routerWillLeave)
	}

	routerWillLeave() {
		return "客官您确定要离开了么？"
	}

	render() {
		return (
			<div className="main">
				<HeaderComponent />
				<ContentComponent />
				<FooterComponent />
			</div>
		)
	}
}
