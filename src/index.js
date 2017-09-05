/**
 * 这个是入口文件
 */
import React from "react"
import {render} from "react-dom"
import {Router,Route,hashHistory,IndexRoute} from "react-router"
import App from "./Componnets/App"
import "./Compnentscss/pc-css.css"
import "./Compnentscss/mobilecss.css"

import NewsContainer from "./Componnets/news_container"
import UserCenter from "./Componnets/user_center"
import NewsDetails from "./Componnets/news_detail"
import MediaQuery from 'react-responsive'

import  MobileNewsContainer from "./Componnets/MobileNewsContainer"
import MobileNewsDetail from "./Componnets/MobileNewsDetail"
import MobileUserCenter from "./Componnets/MobileUserCenter"
import MobileApp from "./Componnets/MobileApp"

render(
  (
  <div>
      <MediaQuery query='(min-device-width: 1224px)'>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={NewsContainer}></IndexRoute>
            <Route path="/NewsDetails/:uniquekey" component={NewsDetails}></Route>
            <Route path="/UserCenter" component={UserCenter}></Route>
          </Route>
        </Router>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 1224px)'>
        <Router history={hashHistory}>
            <Route path="/" component={MobileApp}>
              <IndexRoute component={MobileNewsContainer}></IndexRoute>
              <Route path="/MobileNewsDetail/:id" component={MobileNewsDetail}></Route>
              <Route path="/MobileUserCenter" component={MobileUserCenter}></Route>
            </Route>
        </Router>
      </MediaQuery>
  </div>

),document.getElementById('root'))

