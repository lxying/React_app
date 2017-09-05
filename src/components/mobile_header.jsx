/**
 * 手机端头部
 */

import React,{Component} from 'react';
import {Modal,Tabs,Form,Input,Button,Icon,message} from 'antd';
import {Link} from 'react-router'
import axios from 'axios'
import img from '../images/logo.png';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class MobileHeader extends Component {
state = {
  username : null,
  visible:false
}
  componentDidMount (){
  /*判断是否为登录状态*/
  /* 读取本地保存的数据, 如果有更新状态*/
  const username= localStorage.getItem('username');

  if(username){
    this.setState({username})
  }

}
/*更新模态窗口*/
  handleclose=(visible)=>{

      this.setState({visible })
  }



  /*handleSubmit 登录注册按钮*/
  handleSubmit=(isLogin,event)=>{
    event.preventDefault();
    const {username, password,r_username,r_password,r_confirmPassword} = this.props.form.getFieldsValue();
    /*如果isLogin为true 则代表this.handleclose.bind(this,true）为登录*/
    if(isLogin){
      const url =` http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`
      axios.get(url)
        .then(response=>{
          const result = response.data;


          if(!result){
            message.error('登录失败，请重新登陆')

          }else{

            message.success('登录成功');

            const userId = result.UserId
            const username = result.NickUserName
            console.log(username);
            // 更新状态
            this.setState({username})
            /*记住登录数据*/
            localStorage.setItem('userId',userId)
            localStorage.setItem('username',username)
            /*清空数据*/
            this.props.form.resetFields()
            /*关闭模态框*/
            this.setState({visible: false})
          }

        })
    }else{
      const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`;
      axios.get(url)
        .then(res=>{
          const result = res.data;

          if(result){

            message.success('注册成功');

            /*清空数据*/
            this.props.form.resetFields()

            this.setState({visible: false})
          }else{
            message.error('注册失败')
          }


        })
    }

  }


  render() {
  const {username,visible}= this.state;
  const {getFieldDecorator} = this.props.form;
    const userItem = username
    ?<Link to='/mobile_user_center'>
        <Icon type="inbox"/>
      </Link>
      : <Icon type="setting" onClick={this.handleclose.bind(this,true)}/>

    return (
      <div id="mobileheader">
        <header>
          <Link to='/'>
            <img src={img}/>
            <span>ReactNews</span>
          </Link>
          {userItem}
        </header>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          okType="submit"
          onOk={this.handleclose.bind(this,false)}
          onCancel={this.handleclose.bind(this,false)}

          cancelText="取消"
        >
          <Tabs defaultActiveKey="1" >
            <TabPane tab="登录" key="1">
              {/*登录*/}
              <Form className="MobileForm" onSubmit={this.handleSubmit.bind(this, true)}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <Button type='primary' htmlType="submit">登陆</Button>
             </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              {/*注册*/}
              <Form className="MobileForm"  onSubmit={this.handleSubmit.bind(this, false)}>
                <FormItem>
                  {getFieldDecorator('r_userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('r_password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('r_confirmPassword', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <Button type='primary' htmlType="submit">注册</Button>
              </Form>
            </TabPane>

          </Tabs>
        </Modal>
       </div>

    )
  }
}
export default Form.create()(MobileHeader);