import React from "react";
import { Row, Col, Menu, Icon, Button, Modal, Tabs  } from 'antd';
import NormalLoginForm from "./login.js";
import NormalRegisterForm from "./register.js";
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;

let MenuStyle = {  //去掉导航栏下边框
	"borderBottomColor":"transparent"
}

export default class HeaderComponet extends React.Component{
	
	constructor(){
		super();
		this.state = {
			selectKey: [],
			categories:[],
			isLogin : false,
			showModal : false //关闭
		}
	}

	componentDidMount() {
		fetch("/mock/category.json").then((res) => {
			return res.json();
		}).then((json) => { 
			this.setState({ 
				selectKey:[json.data.categories[0].category_id + "menuItem"],  //与下面格式要保持一致
				categories :　json.data.categories
			})
		});
	}

	handleMenuClick(e) {  //点击后选中菜单
		this.setState({
			"selectKey" : [e.key]
		})
	}

	handleModleShow() {  //点击登录/注册按钮
		this.setState({
			showModal : true
		})
	}

	handleModleCancle() {  //点击modal框右上角的 X 按钮
		this.setState({
			showModal : false
		})
	}
	
	handleLogOut() {  //点击注销按钮
		Modal.success({
		    title: '退出提醒',
		    content: '您已成功退出帐号',
		  });
		this.setState({
			isLogin : false
		})
	    try {
            window.localStorage.removeItem("login");
        }catch(e) {}
	}

	setLogin(value) {  //接收NormalLoginForm组件的登录状态
		 console.log(value)
		this.setState({
			isLogin : value,
			showModal :false
		})
	}

	render() {

		let loginArea = null;

		if( !this.state.isLogin ){
			loginArea = <Button type="primary" onClick={this.handleModleShow.bind(this)}>登录/注册</Button>
		}else{
			loginArea = <Button type="primary" onClick={this.handleLogOut.bind(this)}>注销</Button>
		}

		return (

			<div>
				
			 	<Modal visible={this.state.showModal} title="登录/注册" onCancel={this.handleModleCancle.bind(this)} footer={null} >
					<Tabs defaultActiveKey="1" >
						<TabPane tab="登录" key="1">
							<NormalLoginForm setLogin={this.setLogin.bind(this)} />
						</TabPane>
						<TabPane tab="注册" key="2">
							<NormalLoginForm setLogin={()=>this.setLogin()} />
						</TabPane>
					</Tabs>
      		  	</Modal>

			    <Row>
					<Col span={4}>
						<img src="/images/logo.png" className="logo"/>	
					</Col>
					<Col span={18}>
						<Menu mode="horizontal" className="category-menu" selectedKeys={this.state.selectKey} onSelect={this.handleMenuClick.bind(this)} style={MenuStyle}>
				  	{
					  	this.state.categories.map( (value,index)=>{
					  		return <MenuItem key={value.category_id + "menuItem"}><Icon type={value.icon} />{value.category_name}</MenuItem>
					  	})
					  }
					</Menu>
					</Col>
					<Col span={2}>
						{loginArea}
					</Col>
			    </Row>
   
 			</div>

		)
	}
} 


