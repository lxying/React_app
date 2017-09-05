/**
 * 中间部分单纯列表项
 */
import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'
export  default class NewsBlock extends Component {
  /*设置状态属性的类型*/
  static propsType = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }
  //新闻列表开始为空
  state={
    newsList:null
  }
  componentWillMount(){
    const {type,count} = this.props;
    /*请求地址*/
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
  axios.get(url)
    .then(response=>{

      const newsList = response.data.map(({uniquekey, title})=>(
        {uniquekey, title}
      ))
      this.setState({newsList})
    })
  }

  render() {
    const {newsList} = this.state;
    const {type} = this.props;
    const contentUI = !newsList
    ?<h2>没有任意新闻</h2>
      :(
        <ul>
          {
            newsList.map((news,index)=>(
              <li key={index}>
                <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                  {news.title}
                </Link>
              </li>
            ))
          }
        </ul>
      )
    return (
      <Card>
        {
          contentUI
        }
      </Card>
    )
  }
}
