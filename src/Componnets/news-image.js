/**
 * 这个模块是用来放置信息图片的
 */
import React,{Component,PropTypes} from "react"
import axios from "axios"
import {Card} from "antd"
import {Link} from "react-router"

class NewsImage extends Component{
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
    const url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    console.log(url)
    axios.get(url)
      .then(response=>{
        let result=response.data
        console.log(result)
        //对得到数据进行遍历
        let listNew=result.map((list)=>(
          {
            title:list.title,
            url:list.url,
            authorName:list.author_name,
            imageUrl:list.thumbnail_pic_s,
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
    let {type,count,imageWidth,width}=this.props
    let list=this.state.list
    // 图片样式对象
    const imageStyle = {
      width: imageWidth,
      height: "90px",
      display: 'block'
    }
    // 标题样式对象
    const titleStyle = {
      width: imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
    return (
      <Card title={this.props.type} style={{width: width}} className="topNewsList">

          {
           list?(
             list.map((list,index)=>(
               <div key={index} style={{float:"left"}} className="imageblock">
                 <Link to={`./newsDetails/${list.uniquekey}/${type}`}>
                  <div>
                    <img src={list.imageUrl} style={imageStyle}/>
                  </div>
                  <div className="custom-card">
                    <h3 style={titleStyle}>{list.title}</h3>
                    <p>{list.authorName}</p>
                  </div>
                 </Link>
               </div>
             ))
           ):(<h3>没有新闻可以展示</h3>)
          }

      </Card>

    )
  }
}
export default NewsImage