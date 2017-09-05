/**
 * 这是移动端的头部组件
 */
import React,{Component} from "react"
import {Row,Col,Icon,Modal,Tabs,Form,Input,Button,message} from "antd"
import Logo from "../images/logo.png"
import {Link} from "react-router"
import axios from "axios"

const Tabpane=Tabs.TabPane
const FormItem=Form.Item
class MobileHeader extends Component {
  state={
    unlogin:true,
    register:false,
    ModalShow:false,
  }

  // 给header的图标绑定一个点击事件，
  login=()=>{
    //改变modal的状态
    this.setState({ModalShow:true})
  }

  //给header的图标绑定一个注册的事件
  register=()=>{
    //调用这个方法用来改变图标的的状态
    let {users}=this.props
    if(users){
      //就是退出登录
      localStorage.removeItem("username")
      this.setState({unlogin:true})
    }
  }
  loginSubmit=(event)=>{
    event.preventDefault()
    //调用这个方法用户进行登录
    let {getFieldsValue,resetFields}=this.props.form
    let {username,password}=getFieldsValue()
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`
    axios.get(url)
      .then(response=>{
        let result=response.data
        console.log('login success', result);
        localStorage.setItem("username",result.NickUserName)
        localStorage.setItem("userId", result.UserId)
        this.setState({ModalShow:false})
        message.success("用户已登录")
        this.setState({unlogin:false})
      })
      .catch(error=>{
        console.log('login error', error);
        this.setState({ModalShow:false})
        message.error("登录失败")
      })
      resetFields()
  }
  registerSubmit=()=>{
    //点击这个按钮，将信息进行提交
    let {getFieldsValue,resetFields}=this.props.form
    let {username2,passwordRegister,passwordRegister2}=getFieldsValue()
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${username2}&r_password=${passwordRegister}&r_confirmPassword=${passwordRegister2}`
    axios.get(url)
      .then(response=>{
        //表示已经成功
        let result=response.data
        this.setState({ModalShow:false})
        message.success("注册成功")
      })
      .catch(error=>{
        this.setState({ModalShow:false})
        message.error("注册失败")
      })
    resetFields()
  }

  render (){
    let {getFieldDecorator}=this.props.form
    return (
      <Row id="mobileheader">
        <Col span={4} className="header">
          <Link to="/">
            <img src={Logo} alt="logo"/>
          </Link>
        </Col>
        <Col span={17} className="headerMiddle">
          <Link to="/">
            <span>ReactNews2</span>
          </Link>
        </Col>
        <Col span={1} >
          <div className="headerParent">
            {this.state.unlogin?(<Icon type="setting" className="headerRight"
                                       onClick={this.login}/>)
              :(this.props.users?(
                <Icon type="inbox" className="headerRight"
                      onClick={this.register}/>
              ):(<Link to="/MobileUserCenter">
                <Icon type="inbox" className="headerRight"/></Link>))}
          </div>
        </Col>
        <Modal title="用户中心" visible={this.state.ModalShow}
          onOk={()=>(this.setState({ModalShow:false}))}
               onCancel={()=>(this.setState({ModalShow:false}))}>
          <Tabs>
            <Tabpane tab="登录" key="login" >
              <Form onSubmit={this.loginSubmit}>
                <FormItem label="用户名">
                  {getFieldDecorator("username")(
                    <Input ></Input>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("password")(
                    <Input></Input>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </Tabpane>
            <Tabpane tab="注册" key="register">
              <Form onSubmit={this.registerSubmit}>
                <FormItem label="用户名">
                  {getFieldDecorator("username2")(
                    <Input ></Input>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("passwordRegister")(
                    <Input></Input>
                  )}
                </FormItem>
                <FormItem label="请确认密码">
                  {getFieldDecorator("passwordRegister2")(
                    <Input ></Input>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </Tabpane>
          </Tabs>
        </Modal>
      </Row>
    )
  }
}
export default Form.create()(MobileHeader)
