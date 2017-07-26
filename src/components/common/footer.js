import React from "react";
import { Row, Col } from 'antd';
export default class FooterComponet extends React.Component{
	constructor(){
		super();
		this.state = {
			"advList":[]
		}
	}
	
	componentWillMount(){
		fetch("/mock/advList.json").then( (res)=>{ return res.json()} ).then( (json)=>{
			let advList = json.data[0].list;
			this.setState({
				"advList" :advList
			})
		})
	}
	render(){
		let advList = this.state.advList;
		return (
			<div className="footer">
				<div className="gutter-example">
					<div className="advTitle">友情链接</div>
				    <Row gutter={16}>
				    	{
				    		advList.map((item)=>{
				    			return (
							      <Col className="gutter-row" span={2} key={"col_" +item.list_id }>
							        <div className="gutter-box"><a href="#">{item.list_name}</a></div>
							      </Col>
				    			)
				    		})
				    	}
				    </Row>
				 </div>
				 <div className="copyRight">
				 	<p>本网站由 EasyVOA 开发上线 © 2011-2014 手机版EasyVOA</p>
				 	<p>网站所有内容，均来自VOA官方网站，所有资料均只作为英文学习资料使用。 站长QQ:1801785742 欢迎联系合作</p>
				 </div>
			</div>	 
		)
	}
} 
