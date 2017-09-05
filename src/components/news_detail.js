/**
 * 新闻详情
 */
import React,{Component} from 'react'
import {Col,Row,Tabs} from 'antd'
import {Link} from 'react-router'
import aixos from 'axios'
import NewsComments from './news_comments'
import NewsImageBlock from "./newsImg_block";
import '../components_css/pc.css'
export default class NewsDetail extends Component {
  state={
    pagecontent:null
  }

  componentDidMount(){
    const {uniquekey} = this.props.params;
    this.showDetail(uniquekey);

  }
  componentWillReceiveProps(newProps){

    this.showDetail(newProps.params.uniquekey);

  }
  showDetail(uniquekey){
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
    aixos.get(url)
      .then(response=>{
        const {pagecontent} = response.data;
        this.setState({pagecontent})


      })
  }
  render(){
    const {pagecontent} = this.state;
    const {type,uniquekey} = this.props.params;
    return (
     <div>
       <Row>
         <Col span={1}></Col>
         <Col span={18} className='container'>

           <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
           <NewsComments uniquekey={uniquekey}/>
         </Col>
         <Col span={1}/>
         <Col span={3}>
           <NewsImageBlock type={type} count={6} cardTitle="相关新闻" cardWidth="100%" imgWidth="100%" style={{display:'block'}}></NewsImageBlock>
         </Col>
         <Col span={1}></Col>
       </Row>
     </div>
    )
  }
}
