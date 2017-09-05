/**
 * Created by DELL on 2017/9/5.
 */
import React,{Component} from "react"
import axios from "axios"
import {Card,Form,Button,Input,notification } from "antd"

const FormItem=Form.Item
class MobileNewsDetail extends Component {

  state={
    detail:{},
    comments:[]
  }
  componentDidMount(){
    let {id}=this.props.params
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${id}`
    axios.get(url)
      .then(response=>{
        let result=response.data
        let detail=result.pagecontent
        this.setState({detail})
      })

    //在发一个获取评论的请求
    let url2=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${id}`
    axios.get(url2)
      .then(response=>{
        let result=response.data
        let comments=result.map((comment)=>(
          {
            datetime:comment.datetime,
            Comments:comment.Comments,
            UserName:comment.UserName
          }
        ))
        this.setState({comments})
      })
  }
  submitComment=(event)=>{
    event.preventDefault()
    //这个方法是用来提交评论的，第一步获取输入框中的内容
    let {getFieldValue,resetFields}=this.props.form
    let comment=getFieldValue("comment")
    let {id}=this.props.params
    let userid=localStorage.getItem("userId")
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${id}&commnet=${comment}`
    //发送请求
    axios.get(url)
      .then(response=>{
        let result=response.data
        //提交评论后，第一步更新评论列表，第二步，清空输入框
        this.componentDidMount()
        resetFields()
      })
  }

  //定义一个方法用来收藏文章
  submitAtical=()=>{
    let userid=localStorage.getItem("userId")
    let {id}=this.props.params
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${id}`
    axios.get(url)
      .then(response=>{
        //提示收藏文章成功
        notification.success({message:"收藏成功"})
      })
  }

  render (){
    let {detail,comments}=this.state
    let {getFieldDecorator}=this.props.form
    let  newsComments=comments?(
      comments.map((comment,index)=>(
        <Card title={comment.UserName} extra={comment.datetime} key={index}>
          <p>{comment.Comments}</p>
        </Card>
      ))
    ):(<h2>该文章尚无评论</h2>)
    return(
      <div>
        <div dangerouslySetInnerHTML={{__html:detail}}></div>
        <div>{newsComments}</div>
        <br/><br/><br/><br/>
        <Form onSubmit={this.submitComment}>
          <FormItem label="请输入你的评论">
            {getFieldDecorator("comment")(
              <Input></Input>
            )}
          </FormItem>
          <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
          <Button type="primary" onClick={this.submitAtical}>收藏该文章</Button>
        </Form>
      </div>

    )
  }
}
export default Form.create()(MobileNewsDetail)