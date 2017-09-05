/**
 * 这个是新闻的底部组件
 */
import React,{Component} from "react"
import {Row,Col} from "antd"
class Footer extends Component{
  render (){
    return(
      <Row>
        <Col span={1}></Col>
        <Col span={22}></Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}
export default Footer

