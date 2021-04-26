import './Activity.css'
import React, { Component } from 'react'
import { Link,Switch } from 'react-router-dom'
import {RouteWithSubRoutes} from '../../App'
//import ActivityDetail from './ActivityDetail';
import Value from './Value'


class Activity extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    time:'04-09',text:"禁止在厕所抢吃抢喝",title:"禁止",period:"04-09至04-19"
                },
                {
                    time:'04-12',text:"新风范，宿舍风采大赛"
                },
                {
                    time:'04-13',text:"是谁偷了盛斌的袜子"
                },
                {
                    time:'04-15',text:"可怜学生为何被别人的袜子熏晕在楼道" 
                }
            ],
        }
    }
    onLoad(){
        this.props.history.push({ path : '/value' ,state : { key1: 'idx'} })

    }    
    // onChangeState(name){
    //     this.setState(name)
    // }
    // componentDidMount(){
    //     fetch('/text',{
    //         method:'get',
    //         mode:'cors',
    //         headers:{'Content-Type':'application/json'},
    //     }).then(res=>{
    //         this.setState({data:res})
    //     })
    // }
    render() {
        return(
            <div class="div1">
                <h1>活动通知</h1>
               {
                   this.state.data.map((val,idx)=>(
                       <div key={{idx}} class="div2">
                           {/* {console.log(idx)} */}
                           <span>活动日期：{val.time} </span>
                           <Link to={{pathname:"/value",state:{key1:idx}}}>{val.text}</Link>
                       </div>
                    ))
               } 
            </div>
        )
    }
}
export default Activity;