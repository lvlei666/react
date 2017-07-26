import React from "react";
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  // constructor(props) {
  // 	super(props);
  // }
	
  handleSubmit(e){
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var link = '?username='+ values.userName + '&password=' + values.password;
          fetch('/mock/login.json'+ link).then((response)=>{
              return response.json();
          }).then((json) => {
              if (json.data.login) {
                this.setState({
                  showModal: false,
                  isLogin: true
                })
                console.log(this.state.isLogin)
                this.props.setLogin(this.state.isLogin)//向父组件传登录状态
                try {
                	window.localStorage.login = true;
                }catch(e) {}
              }else {
                notification.open({
                    message: '对不起，密码错误',
                    description: '再重新输入一次吧',
                });
              }
            });
         }
      });
  }
  

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="#">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="">注册</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm

