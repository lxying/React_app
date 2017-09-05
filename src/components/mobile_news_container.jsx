/**
 * Created by Administrator on 2017-09-05.
 */
import React,{Component} from 'react';
import {Link} from 'react-router'
import {Carousel,Tabs} from 'antd'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import MobileUserList from './mobile_news_list'
const  TabPane = Tabs.TabPane;
export default class MobileNewsContainer extends Component {
  render() {
    return (
      <div>
        <Carousel autoplay>
          <div><img src={carousel_1}/></div>
          <div><img src={carousel_2}/></div>
          <div><img src={carousel_3}/></div>
          <div><img src={carousel_4}/></div>
        </Carousel>
        <Tabs>
          <TabPane tab="头条" key="1">
            <MobileUserList type='top' count={10}/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileUserList type='shehui' count={10}/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileUserList type='guonei' count={10}/>
          </TabPane>
          <TabPane tab=" 娱乐" key="4">
            <MobileUserList type='yule' count={10}/>
          </TabPane>
          <TabPane tab="体育" key="5">
            <MobileUserList type='tiyu' count={10}/>
          </TabPane>
          <TabPane tab="科技" key="6">
            <MobileUserList type='keyi' count={10}/>
          </TabPane>
          <TabPane tab="时尚" key="7">
            <MobileUserList type='shishang' count={10}/>
          </TabPane>
          <TabPane tab="国际" key="8">
            <MobileUserList type='guoji' count={10}/>
          </TabPane>
        </Tabs>
      </div>

    )
  }
}