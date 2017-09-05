/**
 * 用户中心组件
 */
import React,{Component} from 'react'
import {Tabs,Col,Row} from 'antd';
/*我的收藏*/
import NewsCollect from './news_collect'
/*我的评论*/
import NewsDiscuss from './news_discuss'
const TabPane = Tabs.TabPane;
export default class UserCenter extends Component{
  render(){
    return (
      <Row>
        <Col span={1}/>
        <Col span={22}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="我的收藏" key="1">
              <NewsCollect></NewsCollect>
            </TabPane>
            <TabPane tab="我的评论" key="2">
              <NewsDiscuss></NewsDiscuss>
            </TabPane>
            <TabPane tab="我的头像" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Col>
        <Col span={1}/>
      </Row>
    ) }
}



