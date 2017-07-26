import React from 'react';
import { Card,Carousel } from 'antd';
import { Link } from 'react-router';

export default class ContentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			articles:[]
		}
	}

	componentDidMount(){
		fetch("/mock/articles.json").then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
				articles:json.data.articles
			})
		})
	}


	render() {

		return (

			<div className="index-content">
				<Carousel autoplay>
					<div className="banner banner_1"></div>
					<div className="banner banner_2"></div>
					<div className="banner banner_3"></div>
					<div className="banner banner_4"></div>
					<div className="banner banner_5"></div>
				</Carousel>
				<Card title="VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。"  style={{ width: 1024 }}>
				    {
				    	this.state.articles.map((value,index) => {
				    		return (
				    			<Link  key={index + '_article'} to={'/detail/' + value.article_id}>
					    			<p className="article-item">
					    				<span className="article-item-category">[{value.category_title}]</span>
					    				{value.title}
					    				&nbsp;&nbsp;[{value.date}]
					    				{value.is_new ? <span className="article-item-new">new</span> : ""}
					    			</p>
								</Link>
				    		)
				    	})
				    }
			    </Card>
		    </div>



		)
	}

}