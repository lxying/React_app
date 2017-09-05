/**
 * Created by Administrator on 2017-09-04.
 */
import React,{Component,PropTypes} from 'react';
import axios from 'axios'
import {Card,Form,Button,Input,message,notification} from 'antd'
const FormItem = Form.Item;
class NewsComments extends Component {
  static propTypes = {
    uniquekey:PropTypes.string.isRequired
  }
  state = {
    comments:null
  }
  componentDidMount(){
    const {uniquekey} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response=>{
        const comments = response.data;

        this.setState({comments});
      })

  }
  handleSubmit=(event)=>{
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const {uniquekey} = this.props;

    const content= this.props.form.getFieldValue('content');
   // console.log(content)
      const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`;

axios.get(url)
  .then(res=>{
    this.componentDidMount();

    /*提示成功*/
    notification.success({
      message:'提交评论成功'
    })
    /*清除数据*/
    this.props.form.resetFields();
  })

  }
  handleCollect=()=>{
    const userId = localStorage.getItem('userId');
    const {uniquekey} = this.props;
    if(!userId){
      message.success('请登录后再收藏');
      return;
    }
      const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response=>{
        notification.success({ message: '首藏成功'})
      })

  }
  render() {
    const {comments} = this.state;
    const commentsList = !comments
      ? <h3>暂时没有评论</h3>
      :comments.map((comment,index)=>(
        <Card key={index} title={comment.username} extra={`发布于${comment.datetime}`}>
          {comment.Comments}
        </Card>
      ))
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        {commentsList}

        <Form onSubmit={this.handleSubmit}>
          <FormItem label='您的评论'>
            {getFieldDecorator('content')(
              <Input type='textarea' placeholder="请输入评论内容" />
            )}
          </FormItem>
          <Button type="primary" htmlType='submit'>提交评论</Button>
          <Button type="primary" onClick={this.handleCollect}>收藏该文章</Button>
        </Form>


      </div>
    )
  }
}
export default Form.create()(NewsComments)