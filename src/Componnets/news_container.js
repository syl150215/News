/**
 * 这个是路由组件，默认组件，该组件用来盛放新闻链接
 */
import React,{Component} from "react"
import {Row,Col,Carousel,Tabs} from "antd"
import {Link} from "react-router"
import Carousel_1 from "../images/carousel_1.jpg"
import Carousel_2 from "../images/carousel_2.jpg"
import Carousel_3 from "../images/carousel_3.jpg"
import Carousel_4 from "../images/carousel_4.jpg"
import Newsblock from "./news_block"
import NewsImage from "./news-image"
import NewsProducts from "./news-product"

const Tabpane=Tabs.TabPane
class NewsContainer extends Component{
  render(){
    return(
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <div className="leftContainer">
            <Carousel autoplay  style={{width:"35%"}} className="carousel" >
              <div>
                <img src={Carousel_1} alt="Carousel_1"/>
              </div>
              <div>
                <img src={Carousel_1} alt="Carousel_1"/>
              </div>
              <div>
                <img src={Carousel_1} alt="Carousel_1"/>
              </div>
              <div>
                <img src={Carousel_1} alt="Carousel_1"/>
              </div>
            </Carousel>
            <NewsImage type="guonei" count={6} imageWidth="112px" width="400px"/>
          </div>
          <Tabs style={{"width":"35%"}} className='tabs_news'>
            <Tabpane  tab="头条新闻" key="toutiao" >
              <Newsblock count={21} type="yule"></Newsblock>
            </Tabpane>
            <Tabpane tab="国际新闻" key="guoji" >
              <Newsblock count={21} type="guoji"></Newsblock>
            </Tabpane>
          </Tabs>
          <Tabs className="tabs_product" style={{width: "30%"}}>
            <Tabpane tab="React News产品" key="1">
              <NewsProducts />
            </Tabpane>
          </Tabs>
          <div>
            <NewsImage count={8} type="guonei" width="100%"
                            cardTitle="国内新闻" imageWidth="132px"/>
            <NewsImage count={16} type="yule" width="100%"
                            cardTitle="娱乐新闻" imageWidth="132px"/>
          </div>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}
export default NewsContainer