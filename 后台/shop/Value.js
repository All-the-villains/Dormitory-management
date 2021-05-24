import './Value.css'
import React, { Component } from 'react'
class Value extends Component {
    constructor() {
        super();
        this.state={
            data:[],
        }
    }
    componentWillMount(){
        //console.log(this.props.location)//传递过来的所有参数
        console.log(this.props.location.state.key1)
        console.log(this.props.location.state.data)
        this.state.data = this.props.location.state.data
        console.log(this.state.data)
    }
    
    render() {
        const id = this.props.location.state.key1
        return (
            <div class="div1">
                <h1 style={{textAlign:'center'}}>{this.state.data[id].atitle}</h1>
                <h2>{this.state.data[id].atext}</h2>
                <br></br>
                <br></br>
                <span style={{marginLeft:1000,marginBottom:10}}>活动持续时间：{this.state.data[id].aperiod}</span>
            </div>
        )
    }
}

export default Value;