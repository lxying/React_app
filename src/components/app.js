/**
 * Created by Administrator on 2017-09-01.
 */
import React,{Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from "./news_footer";
import '../components_css/pc.css'



export default class App extends Component{
  render(){
    return(
     <div>
       <NewsHeader/>

       {this.props.children}
       {

       }
       <NewsFooter/>
     </div>
    )
  }
}