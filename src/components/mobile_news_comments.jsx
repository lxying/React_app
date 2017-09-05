/**
 * Created by Administrator on 2017-09-05.
 */
import React,{Component,PropTypes} from 'react';
import axios from 'axios'
import {Form,Button,Input,Card,notification} from 'antd'
const FormItem = Form.Item;
class MobileNewsComments extends Component {
  static propTypes = {
    uniquekey:PropTypes.string.isRequired
  }

  state = {
    comments:null
  }
  componentDidMount(){
    const {uniquekey} = this.props;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;

    axios.get(url)
      .then(response=>{
      //  console.log(response.data)
        const comments = response.data;

        this.setState({comments})
      })


  }
  /*提交评论*/
  handleSubmit=(event)=>{
    event.preventDefault();
     const content = this.props.form.getFieldValue('content');

    console.log('content'+content)
     const userId = localStorage.getItem('userId');
    console.log('userId'+userId)
    console.log('uniquekey'+uniquekey)
     const {uniquekey} = this.props;
     const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
    console.log({uniquekey})
    axios.get(url)
        .then(response=>{
          this.componentDidMount();

        })
    notification.success({message:'提交成功'});
     this.props.form.resetFields();
  }
  /*收藏文章*/
  handleCollect=()=>{
    const {uniquekey} = this.props;
    const userId = localStorage.getItem('userId')
const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(res=>{
        const result = res.data;
        if(res.data){
          notification.success({message:'提交成功'});
        }else{
          notification.error({message:'提交失败'});
        }

      })
  }


  render() {
    const {comments} = this.state;
    const {getFieldDecorator} = this.props.form;
    const commentsList = !comments
    ? <h3>此新闻暂无评论</h3>
      : comments.map((content,index)=>(
        <Card key={index} title={content.uniquekey} extra={`${content.UserName}发布于${content.datetime}`}>
          {content.Comments}
        </Card>
      ))
    return (
      <div>{commentsList}

        <Form onSubmit={this.handleSubmit}>
          <FormItem label='您的评论'>
            {getFieldDecorator('content')(
              <Input type='textarea' placeholder="请输入评论内容" />
            )}

          </FormItem>
          <Button type="primary" htmlType='submit'>提交评论</Button>
          <Button  type="primary" onClick={this.handleCollect}>收藏文章</Button>
        </Form>


      </div>
    )
  }
}
export default Form.create()(MobileNewsComments)