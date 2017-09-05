/**
 * 这个是用户注册的路由组件(测试完成，路由是好的)
 */
import React,{Component} from "react"
import {Row,Col,Tabs} from "antd"
import CenterDetail from "./user-centerdetail"
const Tabpane=Tabs.TabPane

class UserComponent extends Component{


  render(){
    return(
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Tabs>
            <Tabpane tab="我的收藏列表" key="shoucang">
              <CenterDetail market="shoucang" act="getuc"></CenterDetail>
            </Tabpane>
            <Tabpane tab="我的评论列表" key="comment">
              <CenterDetail market="comment" act="getusercomments"></CenterDetail>
            </Tabpane>
            <Tabpane tab="头像设置" key="headPicture"></Tabpane>
          </Tabs>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}
export default UserComponent