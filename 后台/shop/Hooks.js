import './BlogDetail'
import React, { Component } from 'react'

export default class Hook extends Component {
    constructor(){
        super();
        this.state={
          texts:[],
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
                let a = 0;
                let kind1 = [];
                for(var i=0;i<res.length;i++){
                    if('水卡充值'===res[i].mkind){
                        kind1[a] = res[i];
                        a++
                    }
                }
                this.setState({
                    texts:kind1,
                })
            })
        }
    }
   
    reload(){
        this.props.history.go(0);
    }
    render() {
        return(<div >
            
            <div>
                <ol className='ti'>
                    <li style={{width:100}}>姓名</li>
                    <li style={{width:100}}>缴费金额</li>
                    <li style={{width:100}}>学生学号</li>
                    <li style={{width:100}}>宿舍楼</li>
                    <li style={{width:100}}>宿舍号</li>
                    <li style={{width:200}}>缴费时间</li>
                </ol>
            </div>
        <div>
            {
                (this.state.texts==0)?null:
                this.state.texts.map((text)=>{
                    return(
                        <ol className='co'>
                            <li style={{width:100}}>{text.mname}</li>
                            <li style={{width:100}}>{text.mmoney}</li>
                            <li style={{width:100}}>{text.mstuid}</li>
                            <li style={{width:100}}>{text.mbuild}</li>
                            <li style={{width:100}}>{text.maccnum}</li>
                            <li style={{width:200}}>{text.mtime}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}