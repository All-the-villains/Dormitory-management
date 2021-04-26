import './Value.css'
import React, { Component } from 'react'
class Value extends Component {
    constructor() {
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
    
    componentWillMount(){
        //console.log(this.props.location)//传递过来的所有参数
        console.log(this.props.location.state.key1)
    }
    //let id= this.props.location.state.key1;
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
        return (
            <div class="div1">
                <h1 style={{textAlign:'center'}}>{this.state.data[this.props.location.state.key1].title}</h1>
                <span>{this.state.data[this.props.location.state.key1].text}</span>
            </div>
        )
    }
}

export default Value;