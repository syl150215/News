/**
 * 这个组件是用来定义news-block的
 */
import React,{Component,PropTypes} from "react"
import axios from "axios"
import {Link} from "react-router"
import {Card} from "antd"
class Newsblock extends Component{
  static proptypes={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
  }
  state={
    isloading:true,
    list:false
  }
  componentDidMount(){
    let {type,count}=this.props
    console.log(this)
    //定义一个方法去发送请求
    let url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    console.log(url)
    axios.get(url)
      .then(response=>{
        let result=response.data

        //对得到数据进行遍历
        let listNew=result.map((list)=>(
          {
            title:list.title,
            uniquekey:list.uniquekey
          }
        ))

        //修改状态
        this.setState({isloading:false,list:listNew})
      })
      .catch(error=>{
        //数据请求失败，同样需要修改状态


      })
  }

  render(){
   let list=this.state.list
    console.log(list)
    return  (
      <Card>
        <ul>
          {
            list?( list.map((list,index)=>(
                <li key={index}>
                  <Link to={`./newsDetails/${list.uniquekey}/${this.props.type}`}>
                    <h3>{list.title}</h3>
                  </Link>
                </li>
              )
            )):(<li>没有新闻可以加载</li>)
          }
        </ul>
      </Card>
    )
  }

}
export default Newsblock