/**
 * 这个是主的路由组件
 */
import React,{Component} from "react"

import Header from "./header"
import Footer from "./footer"

class App extends Component{
  render(){
    return(
     <div>
       <Header></Header>
       {this.props.children}
       <Footer></Footer>
     </div>
    )
  }
}
export default App

