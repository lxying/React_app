/**
 * Created by Administrator on 2017-09-01.
 */
import React,{Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo.png'

import {

  Row, // 行
  Col, // 列,
  Menu, //菜单
  Modal, // 确认框.
  Icon, //图标
  Button, //按键
  Tabs, //页签
  Form, //表单
  Input, //输入框
  message, //消息
  } from "antd";
import 'antd/dist/antd.css';

/*自定义nav选项*/
const MenuItem = Menu.Item;

/*自定义tab页签项*/
const TabPane = Tabs.TabPane;
/*表单项*/
const FormItem = Form.Item;

class NewsHeader extends Component{
  /*设置状态*/
  state = {
      currentKey:'top',
      username:null,
      modalShow:false
   }
  showModal = (isShow) => {
    this.setState({modalShow: isShow})
  }
  //将登录的用户名在右上角用户中心显示
  componentMount(){
    const username = localStorage.getItem('username')
    if(username){
      this.setState({username})
    }

  }
  /*判断点击事件key的value的方法*/
  clickMenu =(event)=>{

    //判断登陆窗口是否显示，如果key为registor显示
    if(event.key ==='register'){
      this.setState ({
          modalShow:true
      })
    }
    this.setState({
      currentKey: event.key
    })
  }
  setModalVisible(isShow){
    this.setState({
      modalShow:isShow
    })
  }
  /**/
  /*点击登录/注册按钮时弹出的modal窗口来进行数据交互*/
  handleSubmit=(isLogin)=>{

    const {username,password, r_userName, r_password, r_confirmPassword} =    this.props.form.getFieldsValue();
    /*请求地址*/
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
    if(isLogin){
      /*登录请求参数*/
      url+=`action=login&username=${username}&password=${password}`;
    } else {
      //注册请求参数
      url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
    /*发送请求*/
    axios.get(url)
      .then(response=>{
        /*返回响应内容*/
        const result = response.data;
        /*如果是登录状态*/
        if(isLogin){
          /*登录状态返回信息为 空*/
          if(!result){
            message.error('登录失败，请重新登陆')
          }else{
            /*登录状态返回信息不为空*/
            message.success('登录成功');
            /*返回的用户名*/
            const username = result.NickUserName;
            //返回的密码
            const userId = result.UserId
            this.setState({username})
            /*使用localStory记录下载的用户名和密码*/
            localStorage.setItem("username",username)
            localStorage.setItem("userId",userId)
          }
        }else{
          /*注册内容*/
          message.success('注册成功')
        }
      })
    /*登录和注册之后关闭窗口*/
     this.setState({ modalShow:false})
  }
    /*退出登录*/
  logout = () => {
    this.setState({
      username:null
    })
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
  }

  render(){
    /*状态结构赋值*/
    const {selectedKeys,username,modalShow } = this.state
    /*判断用户是否登录*/
    const userShow = username
      ?
      (
        /*登陆状态*/
      <MenuItem key="logout" className="register">
        <Button type="primary">{username}</Button>
        <Link to="/user_center">
          <Button type="dashed">个人中心</Button>
        </Link>
        <Button onClick={this.logout}>退出</Button>
      </MenuItem>

      )
      :
      (
        /*未登录状态*/
      <MenuItem key="register"  className="register">
        <Icon type="appstore"/> 登陆/注册
      </MenuItem>
    );

    /*
     var { foo, bar } = { foo: "lorem", bar: "ipsum" }
     console.log(foo);
     // "lorem"
     console.log(bar);
    getFieldDecorator用于和表单进行双向绑定，获取该组件的值：this.props.form.getFieldDecorator(id, options)

    * 这里使用的是ES6结构赋值的方法*/
     const {getFieldDecorator} =  this.props.form
    /*header头部虚拟的DOM*/
   return  (
     <header>
       <Row >
         <Col span={1}></Col>
         {/* Logo*/}
         <Col span={3}>
          <a href="#/"className="logo">
            <img src={logo} alt="logo"/>
            <span>ReactNews</span>
          </a>
         </Col>
         <Col span={19}>
           {/*点击判断当前点击内容的key
            onClick={this.clickMenu}  监听点击事件的key来判断是登陆注册还是页签切换
           */}
           <Menu mode="horizontal"  selectedKeys={[selectedKeys]} onClick={this.clickMenu}>

             <MenuItem key="top">
               <Icon type="appstore"/>头条
             </MenuItem>
             <MenuItem key="shehui">
               <Icon type="appstore"/>社会
             </MenuItem>
             <MenuItem key="guonei">
               <Icon type="appstore"/>国内
             </MenuItem>
             <MenuItem key="guoji">
               <Icon type="appstore"/>国际
             </MenuItem>
             <MenuItem key="yule">
               <Icon type="appstore"/>娱乐
             </MenuItem>
             <MenuItem key="tiyu">
               <Icon type="appstore"/>体育
             </MenuItem>
             <MenuItem key="keji">
               <Icon type="appstore"/>科技
             </MenuItem>
             <MenuItem key="shishang">
               <Icon type="appstore"/>时尚
             </MenuItem>

             {userShow}
           </Menu>
           <Modal
             title="用户中心"
             visible={modalShow}
             onOk={this.setModalVisible.bind(this, false)}
             onCancel={this.setModalVisible.bind(this, false)}
             okText="关闭">
             <Tabs defaultActiveKey="1" onChange={() => this.props.form.resetFields()}>
               <TabPane tab="登录" key="1">
                 <Form onSubmit={this.handleSubmit.bind(this, true)}>
                   <FormItem label="用户名">
                     {
                       getFieldDecorator('username')(
                         <Input type='text' placeholder="请输入用户名"/>
                       )
                     }
                   </FormItem>
                   <FormItem label="密码">
                     {
                       getFieldDecorator('password')(
                         <Input type='password' placeholder="请输入密码"/>
                       )
                     }
                   </FormItem>
                   <Button type='primary' htmlType="submit">登陆</Button>
                 </Form>

               </TabPane>
               <TabPane tab="注册" key="2">
                 <Form onSubmit={this.handleSubmit.bind(this, false)}>
                   <FormItem label="用户名">
                     {
                       getFieldDecorator('r_userName')(
                         <Input type='text' placeholder="请输入用户名"/>
                       )
                     }
                   </FormItem>
                   <FormItem label="密码">
                     {
                       getFieldDecorator('r_password')(
                         <Input type='password' placeholder="请输入密码"/>
                       )
                     }

                   </FormItem>
                   <FormItem label="确认密码">
                     {
                       getFieldDecorator('r_confirmPassword')(
                         <Input type='password' placeholder="请输入确认密码"/>
                       )
                     }

                   </FormItem>
                   <Button type='primary' htmlType="submit">注册</Button>
                 </Form>

               </TabPane>
             </Tabs>
           </Modal>



         </Col>
         <Col span={1}></Col>
       </Row>
     </header>
   )
  }
}
//对NewsHeader组件进行包装产生一个新的组件类, 并向NewsHeader传入一个属性: form

export default Form.create()(NewsHeader)
