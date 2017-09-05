/**
 * 这个是新闻详情的路由组件
 */
import React,{Component} from "react"
import axios from "axios"
import {Row,Col,Form,Input,Button,notification} from "antd"
import Newsblock from "./news-image"
import NewsComment from "./news_comment"
//这是一个路由组件，只能通过在注册路由的时候，将参数进行传递

const Formitem=Form.Item
class NewsDetails extends Component {
  state={
    newsDetail:""
  }

  componentDidMount(){
    let {uniquekey}=this.props.params
     let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
     axios.get(url)
       .then(response=>{
         let result=response.data
         let newsDetail=result.pagecontent
         console.log(result)
         this.setState({newsDetail})

       })
       .catch(error=>{

       })
     }
     //定义一个方法用来提交评论
     commentSubmit=()=>{
       let {uniquekey}=this.props.params
       let comment=this.props.form.getFieldValue("comment")
       let userId=localStorage.getItem("userId")
       let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comment}`
       if(!userId){
         return notification.error({message:"请先登录"})
       }
       //收集好信息后提交请求
       axios.get(url)
         .then(response=>{
           //信息提交成功后，可以给个信息提示
           notification.success({message:"评论提交成功"})
           //进行更新评论列表
           this.componentDidMount()
           //将输入框中的内容进行删除
           this.props.form.resetFields()
         })
         .catch(error=>{
           notification.error({message:"评论提交失败"})
         })
       }

       //定义一个方法用来收藏该文章
      articleCollect=()=>{
        let {uniquekey}=this.props.params
        let userId=localStorage.getItem("userId")
        let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        if(!userId){
          return notification.error({message:"请先登录"})
        }
        axios.get(url)
          .then(response=>{
            notification.success({message:"文章收藏成功"})
          })
          .catch(error=>{
            notification.error({message:"文章收藏失败"})
          })
  }

     render(){
       let {newsDetail}=this.state
       let {getFieldDecorator,getFieldsValue}=this.props.form
       return(
         <Row>
           <Col span={1}></Col>
           <Col span={16} className="container">
             <div dangerouslySetInnerHTML={{__html:newsDetail}}></div>
             <NewsComment uniquekey={this.props.params.uniquekey} ></NewsComment>
             <br/><br/><br/><br/><br/>
             <div>请输入你的评论
               <Form onSubmit={this.commentSubmit} >
                 <Formitem>
                   {getFieldDecorator("comment")(
                     <Input type="text" value="这是一个输入框"></Input>
                   )}
                 </Formitem>
                   <Button type="primary" htmlType="submit">提交评论</Button>
                   <Button type="primary" onClick={this.articleCollect}>收藏该文章</Button>
               </Form>
             </div>
           </Col>
           <Col span={6}>
             <Newsblock type={this.props.params.type} count={40}></Newsblock>

           </Col>
           <Col span={1}></Col>
         </Row>
       )
     }
}
export default Form.create()(NewsDetails)