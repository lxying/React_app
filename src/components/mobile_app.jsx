/**
 * 手机端整体结构搭建
 */
import React,{Component} from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './news_footer'
import '../components_css/mobile.css'
export default class MobileApp extends Component{
  render(){
    return (
      <div>
        <MobileHeader></MobileHeader>
        <div style={{height:'55px'}}></div>
        {this.props.children}
        <MobileFooter></MobileFooter>
      </div>
    )
  }
}



