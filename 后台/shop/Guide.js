import React, { Component } from 'react'
import './Guide.css'
export default class Guide extends Component {
    constructor(){
        super();
        this.state={
          goods:[],
        }
    }
    componentDidMount(){
        if(!this.props.location.state){
            fetch('/money',{
                method:'get',
                mode:'cors',
                headers:{'Content-Type':'application/json'},
            }).then(res=>res.json())
            .then(res=>{
                console.log(res)
                let a = 0;
                let kind1 = [];
                for(var i=0;i<res.length;i++){
                    if('饭卡充值'===res[i].mkind){
                        kind1[a] = res[i];
                        a++
                    }
                }
                this.setState({
                    goods:kind1,
                })
            })
        }
        
    }
   
    reload(){
        this.props.history.go(0);
    }
    render() {
        console.log(this.state.goods)
        return(<div>
           
        <div>
            <ol className='gt'>
                <li style={{width:100}}>姓名</li>
                <li style={{width:100}}>缴费金额</li>
                <li style={{width:100}}>学生学号</li>
                <li style={{width:100}}>宿舍号</li>
                <li style={{width:100}}>宿舍楼</li>
                <li style={{width:200}}>缴费时间</li>
            </ol>
        </div>
        <div>
            {
                (this.state.goods==0)?null:
                this.state.goods.map((good)=>{
                    return(
                        <ol className='gc'>
                            <li style={{width:100}}>{good.mname}</li>
                            <li style={{width:100}}>{good.mmoney}</li>
                            <li style={{width:100}}>{good.mstuid}</li>
                            <li style={{width:100}}>{good.mbuild}</li>
                            <li style={{width:100}}>{good.maccnum}</li>
                            <li style={{width:200}}>{good.mtime}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}