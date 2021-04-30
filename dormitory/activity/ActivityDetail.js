import './Activity.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ActivityDetail extends Component {
    constructor(){
        super();
        this.state={
            data:[],
        }
    }
    onLoad(){
        this.props.history.push({ path : '/value' ,state : { key1: 'idx'} })
        
    }    
    componentDidMount(){
        fetch('/activity',{
            method:'get',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
        }).then(res=>res.json())
        .then(res=>{
            this.setState({data:res});
            //console.log(res);
            //console.log(this.state.data);
        })
    }
    render() {
        return(
            <div class="div1">
                <h1>活动通知</h1>
                {
                   this.state.data.map((val,idx)=>(
                       <div key={{idx}} class="div2">
                           <span>活动日期：{val.atime} </span>
                           <Link to={{pathname:"/value",state:{key1:idx,data:this.state.data}}} style={{marginLeft:20}}>{val.atitle}</Link>
                       </div>
                    ))
               } 
            </div>
        )
    }
}
export default ActivityDetail;