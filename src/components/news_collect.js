/**
 * Created by Administrator on 2017-09-04.
 */
import React,{Component,PropTypes} from 'react';
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios';
export default class NewsCollect extends Component {

  state ={
    collect:null,
  }

  // 初始化显示执行
  componentDidMount () {
    // ajax请求获取评论数据
    const userid = localStorage.getItem('userId');
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userid}`;

    axios.get(url)
      .then(response=>{
      //  console.log(response.data)
        let collect = response.data.map(({uniquekey, Title})=>(
          {uniquekey, Title}
        ));
        this.setState({collect});

       // console.log(collect)

      })
  }

  render() {
    const {collect} = this.state;
    const collectList = !collect
      ?<h2>暂无收藏的新闻</h2>
      :(
       <div>
         {
           collect.map((collect,index)=>(
             <Card key={index}>
                 <Link to={`/news_detail/${collect.uniquekey}`}>
                 {collect.Title}
               </Link>)
             </Card>
             ))
         }
       </div>
      )
    return (
      <div>
        {collectList}
      </div>
    )
  }
}