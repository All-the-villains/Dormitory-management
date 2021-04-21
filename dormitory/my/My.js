

import './My.css'
import React, { Component } from 'react'

export default class List extends Component {
    constructor(){
        super();
        this.state={
          lists:[],
        }
    }
    componentDidMount(){
        fetch('/detail',{
            method:'get',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
        }).then(res=>res.json())
        .then(res=>{
            this.setState({lists:res})
        })
    }
    render() {
        return(<div>
        <div>
            <ol className='tit'>
                <li style={{width:200}}>订单id</li>
                <li>商品id</li>
                <li>数量</li>
                <li>订单状态</li>
                <li>所属商店id</li>
                <li>取货码</li>
                <li>订单创建时间</li>
            </ol>
        </div>
        <div>
            {
                (this.state.lists==0)?null:
                this.state.lists.map((list)=>{
                    let state;
                    if(list.dstate==1){
                        state ='待支付'
                    }
                    else if(list.dstate==2){
                        state ='未提货' 
                    }
                    else{
                        state = '已提货'
                    }
                    return(
                        <ol className='conn'>
                            <li style={{width:200}}>{list.usid}</li>
                            <li>{list.gid}</li>
                            <li>{list.dsum}</li>
                            <li>{state}</li>
                            <li>{list.sid}</li>
                            <li>{list.dma}</li>
                            <li>{list.dtime}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}