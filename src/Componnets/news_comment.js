/**
 * 这个组件是针对每个新闻下的评论的
 */
import React,{Component} from "react"
import axios from "axios"
import {Card} from "antd"

class NewsComment extends Component {
  state={
     commonList:[]
  }
  componentDidMount(){
    let {uniquekey}=this.props
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        let result=response.data
        this.setState({commonList:result})
      })
      .catch(error=>{

      })
  }
  render(){
    let {commonList}=this.state
    return(
      <div>
        {
          commonList?(
            commonList.map((commont,index)=>(
              <Card title={commont.UserName} extra={commont.datetime} key={index}>
                <p>{commont.Comments}</p>
              </Card>
            ))
          ):(<h3>暂无评论</h3>)
        }
      </div>

    )
  }
}
export default NewsComment