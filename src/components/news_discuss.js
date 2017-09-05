/**
 * Created by Administrator on 2017-09-04.
 */
import React,{Component} from 'react';
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios';
export default class NewsDiscuss extends Component {
  state = {
    discuss:null
  }
  componentDidMount(){
    const userId = localStorage.getItem('userId');
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response=>{

        const discuss = response.data
        this.setState({discuss});

        console.log(discuss)
      })
  }


  render() {
    const {discuss} = this.state;
    const discussList = !discuss
      ? <h2>暂无评论文章</h2>
      : discuss.map((comment,index)=>(
        <Card key={index} title={comment.uniquekey} extra={<Link to={`/news_detial/${comment.uniquekey}/top`}/>}>{comment.Comments}</Card>
      ))
    return (
      <div>
        {discussList}
      </div>
    )
  }
}