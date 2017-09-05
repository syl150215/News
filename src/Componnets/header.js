/**
 * 这个是头部的组件
 */
import React,{Component,PropTypes} from "react"
import Logo from "../images/logo.png"
import axios from "axios"
import {Link} from "react-router"
import {
         Row,
         Col,
         Icon,
         Menu,
         Button,
         Modal,
         Tabs,
         Form,
         Input,
         message,
         }  from "antd"

class Header extends Component {
  static propTypes={

  }
  constructor(props){
    super(props)
    this.state={
      login:true,
      logout:false,
      ModalShow:false,
      tabChange:"login"
    }
  }

  //定义一个方法用来修改登录和注册的状态
  loginChange=()=>{
    let usernames=localStorage.getItem("username")
    if(usernames){
      this.setState({logout:true,login:false})

    }else{
      this.setState({logout:false,login:true})
    }
  }
  //定义一个方法来改变modal的状态
  ModalChange=(show)=>{
    console.log("ModalChange")
    this.setState({ModalShow:show})
  }

  changeModal=(event)=>{
   console.log(event)
    if(event.key==="login"){
      this.ModalChange(true)
    }

  }

  //定义一个方法来修改 选项卡中的状态
  TabChange=(key)=>{
    console.log("TabChange")
    this.setState({tabChange:key})
  }
  //这是一个  登录验证的方法
  loginSubmit=()=>{
    //发送请求时 需要获取输入框中的东西
    let {getFieldsValue}=this.props.form
    let username=getFieldsValue().username
    let password=getFieldsValue().password
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`
    //发送请求
    axios.get(url)
      .then(response=>{
        //当请求发送成功的状态
        let result=response.data
        //获取到usernameid 和UserId  将用户名保存在loaclstorage中，
        let Nickusername=result.NickUserName
        let userId=result.UserId
        localStorage.setItem({"username":Nickusername,"UserId":userId})
        this.ModalChange(false)
        this.messageAlert(true,"登录成功")
        console.log("成功")
      })
      .catch(error=>{
        this.ModalChange(false)
        this.messageAlert(false,"用户名或密码错误")
        console.log(error)
      })
  }
  //搞一个注册的方法
  regisSubmit=()=>{
    let {getFieldsValue}=this.props.form
    let username2=getFieldsValue().username2
    let passwordRegisted=getFieldsValue().passwordRegisted
    let passwordRegisted2=getFieldsValue().passwordRegisted2
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?
    action=register&r_userName=${username2}&r_password=${passwordRegisted}&r_confirmPassword=${passwordRegisted2}`
    //发送请求
    axios.get(url)
      .then(response=>{
        this.ModalChange(false)
        this.messageAlert(true,"注册成功，请进行登录")
      })
      .catch(error=>{
        this.ModalChange(false)
        this.messageAlert(false,"注册失败")
      })
  }

  //搞一个方法来进行消息提醒
  messageAlert=(flag,msg)=>{
    console.log("msg")
    const  success=message.success
    const  error=message.error
    if(flag){
       //成功的情况下，去调用成功的提示信息
      message.success(msg)
    }else{
      message.error(msg)
    }
  }

  //弄一个方法用来处理退出操作的
  update=()=>{
    //做一个清空的处理
    localStorage.removeItem("username")

  }
  render(){

    const MenuItem=Menu.Item
    const TabPane = Tabs.TabPane
    const FormItem=Form.Item
    let {login,logout,tabChange}=this.state
    let usernames=localStorage.getItem("username")
    const { getFieldDecorator, getFieldsError, getFieldError,
            isFieldTouched } = this.props.form;
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/NewsContainer" className="logo">
              <img src={Logo} alt="Logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" onClick={this.changeModal}>
              <MenuItem key="top">
                <Icon type="appstore" />头条
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore" />国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore" />国际
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore" />体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore" />科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore" />时尚
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore" />娱乐
              </MenuItem>

              { usernames?( <MenuItem key="register" className="login">
                <Button type="primary">{localStorage.getItem("username")}</Button>
                <Button htmlType="submit">
                  <Link to="./UserCenter">
                    <p>个人中心</p>
                  </Link>
                </Button>
                <Button type="primary" onClick={this.update}>退出</Button>
              </MenuItem>):(<MenuItem key="login" className="login">
                <Icon type="appstore" />登录/注册
              </MenuItem>)}
            </Menu>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Modal visible={this.state.ModalShow} title="用户中心"
                onCancel={()=>{this.ModalChange(false)}}
                 onOk={()=>{this.ModalChange(false)}}>
          <Tabs activeKey={tabChange} onChange={this.TabChange}>
            <TabPane tab="登录" key="login">
              <Form onSubmit={this.loginSubmit}>
                <FormItem label="用户名">
                  {getFieldDecorator("username")(
                    <Input type="text"></Input>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("password")(
                    <Input type="password"></Input>
                  )}
                </FormItem>
                <FormItem>
                  <Button  htmlType="submit" type="primary">提交</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="register">
              <Form  onSubmit={this.regisSubmit}>
                <FormItem label="用户名">
                  {getFieldDecorator("username2")(
                    <Input type="text"></Input>
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator("passwordRegisted")(
                    <Input type="password"></Input>
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator("passwordRegisted2")(
                    <Input type="password"></Input>
                  )}
                </FormItem>
                <FormItem>
                  <Button  htmlType="submit" type="primary">提交</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>

        </Modal>
      </div>


    )
  }
}
export default Form.create()(Header)