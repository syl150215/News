/**
 *
 */
import React,{Component,PropTypes} from "react"
import axios from "axios"
import {Form,Input,Card} from "antd"
import {Link} from "react-router"
import PubSub from "pubsub-js"
const Formitem=Form.Item

class Centerdetails extends Component{
 static propTypes={
   market:PropTypes.string.isRequired,
   act:PropTypes.string.isRequired
 }
  state={
    isloading:true,
    choucanglist:[],
    pinglunList:[],

  }
  componentDidMount(){
    let {market}=this.props
    let userId=localStorage.getItem("userId")
    let {act}=this.props
    PubSub.publish("users","true")
    //获取用户收藏列表的请求地[址
    if(market==="shoucang"){

      let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${act}&userid=${userId}`
     axios.get(url)
       .then(response=>{
         let result=response.data
         let commentNew=result.map((comment,index)=>(
           {uniquekey:comment.uniquekey,
             Title:comment.Title}
         ))
         this.setState({choucanglist:commentNew,isloading:false})
       })
       .catch(error=>{
       })
    }else{
      //这个是获取品论列表的请求
      let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${act}&userid=${userId}`
      axios.get(url)
        .then(response=>{
          let result=response.data
          let commentNew2=result.map((comment,index)=>(
            {comments:comment.Comments,
              datetime:comment.datetime}
          ))
          this.setState({pinglunList:commentNew2,isloading:false})
        })
        .catch(error=>{
        })
    }

    //
  }
  render(){
    let {choucanglist,pinglunList}=this.state
    let  {market}=this.props
     if(market==="shoucang"){
       return (
         <div>
           {
             choucanglist.map((comment,index)=>(
               <Card key={index} title={comment.uniquekey} extra={<Link to={`./newsDetails/${comment.uniquekey}`}>查看</Link>}>
                 <h4>{comment.Title}</h4>
               </Card>
             ))
           }
         </div>
       )
     }else{
       return (
         <div>
           {
             pinglunList.map((comment,index)=>(
               <Card key={index} title={comment.comments}>
                 <h4>{comment.datetime}</h4>
               </Card>
             ))
           }
         </div>
       )
     }
  }
}
export default Centerdetails