/**
 * 这是移动端的根路由
 */
import React,{Component} from "react"
import MobileHeader from "./MobileHeader"
import  Footer from "./footer"
import Pubsub from "pubsub-js"

class MobileApp extends Component{
  state={
    usercenter:false
  }
  componentDidMount(){
    console.log(this)
    Pubsub.subscribe("users",function(users,boolean){
     this.userCenter(boolean)
    })
  }
  //搞一个方法用来，处理usercenter的
  userCenter=(boolean)=>{
    this.setState({usercenter:boolean})
  }

  render(){
    return(
      <div>
        <MobileHeader id="mobileheader" users={this.state.usercenter}></MobileHeader>
        {this.props.children}
        <Footer ></Footer>
      </div>
    )
  }
}
export default MobileApp
