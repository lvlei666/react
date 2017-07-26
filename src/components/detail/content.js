import React from 'react';

export default class ContentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		var id = this.props.id;
		fetch('/mock/article.json?id=' + id).then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
				"title":json.data.title,
				"content":json.data.content,
				"time":json.data.time,
				"source":json.data.source,
				"mp3":json.data.mp3,
				"count":json.data.count
			})
		})
	}

	render() {

		return (
			<div>
				<h1>{this.state.title}</h1>
				<p>
					<span className="time">时间:{this.state.time}</span>
					<span className="source">来源:{this.state.source}</span>
					<span className="count">收听下载次数:{this.state.count}次</span>
				</p>
				<audio src={this.state.mp3}></audio>
				<div dangerouslySetInnerHTML={{__html:this.state.content}}></div>
			</div>
		)
	}
}

