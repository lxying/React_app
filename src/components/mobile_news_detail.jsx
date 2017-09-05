/**
 * Created by Administrator on 2017-09-05.
 */
import React,{Component,PropTypes} from 'react';
import axios from 'axios'
import MobileNewsComments from './mobile_news_comments'
export default class MobileNewsDetail extends Component {

  state={
    pagecontent:null,
    comments:null
  }
componentDidMount(){
    /*新闻uniquekey唯一ID,在点击进入详情之前的列表选项链接中保存
    * this.props.params传递链接进来的地址中的参数
    * */
  const {uniquekey} = this.props.params;

  let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`

  axios.get(url)
    .then(response=>{

      const {pagecontent} = response.data;
      this.setState({pagecontent})
    })

  /*新闻评论*/
  url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
  axios.get(url)
    .then(response=>{

      const {comments} = response.data;
      this.setState({comments});
    })

}


  render() {
  const {pagecontent} = this.state;
  const {uniquekey} = this.props.params;
    return (
      <div style={{padding:'10px'}}>
        {/* dangerouslySetInnerHTML={{__html:newsArr}}
          将返回的字符串格式的HTML页面转化为正常的Html页面

        */}
        <div dangerouslySetInnerHTML={{__html:pagecontent}}>

        </div>


        {/*新闻评论*/}
        <MobileNewsComments uniquekey={uniquekey}></MobileNewsComments>


      </div>
    )
  }
}