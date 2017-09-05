/**
 * Created by Administrator on 2017-09-03.
 */
import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'
export  default  class NewsImgBlock extends Component {
  /*图片固定属性*/
  static propTypes={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardTitle:PropTypes.string.isRequired,

    imgWidth:PropTypes.string.isRequired
  }
state = {
  newsArr:null
}
componentWillMount(){
    const {type,count} = this.props;
    const url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

  axios.get(url)
    .then(response=>{

     const newsArr = response.data.map(
        ({uniquekey, title, author_name, thumbnail_pic_s})=>(
          {uniquekey, title, author_name, thumbnail_pic_s})
      )
      this.setState({newsArr})
    })

}
  render() {
  const {cardTitle,imgWidth,type} = this.props;
  const {newsArr} = this.state;
  const imgStyle = {
    width:imgWidth,
    height:'90px',
    display:'block'
  }
  const titleStyle={
    "width": imgWidth,
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis"
  }

const newsList = !newsArr
  ?<h2>无新闻</h2>
  :(
    newsArr.map((news,index)=>(
      <div key={index} className="imageblock">
        <Link to={`/news_detail/${news.uniquekey}/${type}`}>
          <div>
            <img src={news.thumbnail_pic_s} style={imgStyle} />
          </div>
          <div className="custom-card">
            <h3 style={titleStyle}>{news.title}</h3>
            <p>{news.author_name}</p>
          </div>
        </Link>
      </div>
    ))
  )
    return (
      <Card title={cardTitle} >
        {
          newsList
        }
      </Card>
    )
  }
}