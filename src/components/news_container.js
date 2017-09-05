/**
 *新闻列表
 */
import React,{Component} from 'react'
/*路由中提供的a链接*/
import {Link} from 'react-router'
/*antd规定标签引入*/
import {Carousel,
        Col,
        Row,
        Tabs,
} from 'antd'
/*图片暴露*/
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
/*模块暴露*/
import  NewsBlock from './newsList_block'
import NewsImgBlock from './newsImg_block'
import NewsProducts from './news_products'
const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{

  render(){
    return (
      <div className="container">
        <Row className="top">
          <Col span={1}/>
          {/*左边内容*/}
          <Col className="leftContainer" span={7}>
              {/*banner*/}
            <Carousel autoplay>
              <div><img src={carousel_1}/></div>
              <div><img src={carousel_2}/></div>
              <div><img src={carousel_3}/></div>
              <div><img src={carousel_4}/></div>
            </Carousel>
              {/*新闻图片列表*/}
            <NewsImgBlock type="guoji" cardTitle="国际新闻" count={6} cardWidth="100%" imgWidth="100%">

            </NewsImgBlock>
          </Col>
          <Col span={1}/>
          {/*中间新闻列表*/}
          <Col span={7}>
            <newList className="topNewsList">
              <Tabs defaultActiveKey="1" className="newList">
                <TabPane tab="头条新闻" key="1">
                  <NewsBlock type="top" count={20}></NewsBlock>
                </TabPane>
                <TabPane tab="国际新闻" key="2">
                  <NewsBlock type="top" count={20}></NewsBlock>
                </TabPane>

              </Tabs>
            </newList>
          </Col>
          <Col span={1}/>
          {/*右侧内容*/}
          <Col span={6}>
            <Tabs >
              <TabPane key="1" tab="React News产品">
                <NewsProducts></NewsProducts>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}/>
        </Row>
        <Row className="bottom">
         <Col span={1}/>
          <Col span={22}>
            <NewsImgBlock type="guonei" cardTitle="国内新闻" count={8}  imgWidth="100%">

            </NewsImgBlock>
            <NewsImgBlock type="guoji" cardTitle="国际新闻" count={16} imgWidth="100%">

            </NewsImgBlock>
          </Col>
          <Col span={1}/>
        </Row>
      </div>
    )
  }
}




