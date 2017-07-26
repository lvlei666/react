import { Form, Modal, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React from "react";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  
  constructor(){
  	super();
  	this.state = {
	    "confirmDirty": false,
	    "autoCompleteResult": []
 	 };	
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Modal.success({
		    title: '注册成功',
		    content: '开始新的冒险',
		  });
		  this.props.setLogin();
      }else{
	     Modal.error({
		    title: '错误',
		    content: '请按要求填写表单',
		  });
      }
    });
  }
  
  handleConfirmBlur(e){
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  checkPassword (rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('前后两次密码不一致!');
    } else {
      callback();
    }
  }
  
  checkConfirm (rule, value, callback){
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange(value){
    let autoCompleteResult = null;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="邮箱"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: '请输入邮箱',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.checkConfirm.bind(this),
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码',
            }, {
              validator: this.checkPassword.bind(this),
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="给自己起个昵称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="验证码"
          extra="确保不是机器"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入您获得的验证码' }],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large">获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>我已阅读<a href="">条款协议</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm