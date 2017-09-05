/**
 * Created by DELL on 2017/9/5.
 */
import React,{Component} from "react"
import {Tabs,Carousel} from "antd"
import Carousel1 from "../images/carousel_1.jpg"
import Carouse2 from "../images/carousel_2.jpg"
import Carouse3 from "../images/carousel_3.jpg"
import Carouse4 from "../images/carousel_4.jpg"
import MobileNewsBlock from "./MobileNewsBlock"

const Tabpane=Tabs.TabPane

class MobileNewsContainer extends Component{
  render(){
    return (
      <Tabs>
        <Tabpane tab="头条" key="toutiao">
          <Carousel autoplay>
            <div><img src={Carousel1} alt="Carousel"/></div>
            <div><img src={Carouse2} alt="Carouse2"/></div>
            <div><img src={Carouse3} alt="Carouse3"/></div>
            <div><img src={Carouse4} alt="Carouse4"/></div>
          </Carousel>
          <MobileNewsBlock type="top" count="30"/>
        </Tabpane>
        <Tabpane tab="社会" key="shehui">
          <MobileNewsBlock type="shehui" count="40"/>
        </Tabpane>
        <Tabpane tab="国内" key="guonei">
          <MobileNewsBlock type="guonei" count="40"/>
        </Tabpane>
        <Tabpane tab="国际" key="guoji">
          <MobileNewsBlock type="guoji" count="40"/>
        </Tabpane>
        <Tabpane tab="娱乐" key="yule">
          <MobileNewsBlock type="yule" count="40"/>
        </Tabpane>
      </Tabs>

    )
  }
}
export default MobileNewsContainer