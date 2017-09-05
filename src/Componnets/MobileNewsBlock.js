/**
 * 这是定义一个在newscontainer中 的新闻块
 */
import React,{Component} from "react"
import axios from "axios"
import {Card,Row,Col} from "antd"
import {Link} from "react-router"

class MobileNewsBlock extends Component {
  state={
    isloading:true,
    List:false
  }
  componentDidMount(){
    let {type,count}=this.props
    //发送请求
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response=>{
        let result=response.data
        let List=result.map((list)=>(
          {
            realtype:list.realtype,
            img:list.thumbnail_pic_s,
            title:list.title,
            date:list.date,
            uniquekey:list.uniquekey
          }
        ))
        this.setState({List:List,isloading:false})
      })
      .catch(error=>{
        this.setState({isloading:true})
      })
  }
  render(){
    let {isloading,List}=this.state
    let newlist= isloading?(<h2>没有新闻可以加载</h2>):(
      List.map((todo,index)=>(

          <Row key={index}>
            <Card>
              <Link to={`/MobileNewsDetail/${todo.uniquekey}`}>
                <Col span={1}></Col>
                <Col span={8} className="blockImage">
                  <img src={todo.img} />
                </Col>
                <Col span={11} className="fontImage">
                  <p>{todo.title}</p>
                  <div>
                    <span>{todo.realtype}</span>&nbsp;&nbsp;&nbsp;
                    <span>{todo.date}</span>
                  </div>
                </Col>
                <Col span={2}></Col>
              </Link>
            </Card>
          </Row>

      ))
    )
    return (
      <div>
        {newlist}
      </div>
    )
  }
}
export default MobileNewsBlock
