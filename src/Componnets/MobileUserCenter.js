/**
 * Created by DELL on 2017/9/5.
 */
import React,{Component} from "react"
import {Row,Col,Tabs,Upload} from "antd"
import CenterDetail from "./Mobile-user-centerdetail"
const Tabpane=Tabs.TabPane

class MobileUserCenter extends Component{
  constructor(props) {
    super(props)
    this.state = {
      userCollections: [],
      userComments: [],
      preViewImage: '',
      previewVisible: false,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }
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
            <TabPane tab="头像设置" key="3">
              <div>
                <Upload
                  action="http://jsonplaceholder.typicode.com/photos"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}>
                  {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="预览" style={{width: '100%'}} src={previewImage}/>
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}
export default MobileUserCenter