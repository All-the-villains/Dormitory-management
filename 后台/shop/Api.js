import './List.css'
import React, { Component } from 'react'

export default class List extends Component {

    constructor(){
        super();
        this.state={
          lists:[],
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
                    if('空调缴费'===res[i].mkind){
                        kind1[a] = res[i];
                        a++
                    }
                }
                this.setState({
                    lists:kind1,
                })
            })
        }
    }
   
    render() {
        return(<div >
           
        <div>
        
            <ol className='tit'>
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
                (this.state.lists==0)?null:
                this.state.lists.map((list)=>{
                    return(
                        <ol className='conn'>
                            <li style={{width:100}}>{list.mname}</li>
                            <li style={{width:100}}>{list.mmoney}</li>
                            <li style={{width:100}}>{list.mstuid}</li>
                            <li style={{width:100}}>{list.mbuild}</li>
                            <li style={{width:100}}>{list.maccnum}</li>
                            <li style={{width:200}}>{list.mtime}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}