import './Core.css'
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class Core extends Component {
    constructor(){
        super();
        this.state={
          stores:[],
          id:''
        }
    }
    componentDidMount() {
        fetch('/money', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({ stores: res })
                console.log(res)
            })
    }
    inputChangeFirst(e){
        this.setState({
            id:e.target.value,
        })
    }
    find() {
        if (this.state.id == '') {
            alert('未输入学号。请输入学号')
        } else {
            fetch('/searchmoney', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "mstuid": this.state.id }),
            }).then(res => {
                //console.log(JSON.stringify(param))
                if (res.status === 200) {
                    res.json().then(res=>{
                        this.setState({ stores:res })
                    },(err)=>{
                        console.log('失败'+err)
                        alert('没有对应信息或是学号错误')
                    }
                    )
                }
            }
            )
        }
    }
    reload(){
        this.props.history.go(0);
    }
    render() {
        return(<div>
            <input type='text'  onChange={(e)=>this.inputChangeFirst(e)} className='put2'></input>
            <button onClick={() =>this.find()}>查询</button>
        <div>
            <ol className='t'>
                <li style={{width:300}}>表单号</li>
                <li style={{width:100}}>姓名</li>
                <li style={{width:100}}>缴费金额</li>
                <li style={{width:100}}>学生学号</li>
                <li style={{width:100}}>宿舍楼</li>
                <li style={{width:100}}>宿舍号</li>
                <li style={{width:200}}>缴费时间</li>
                <li style={{width:100}}>缴费种类</li>
             
            </ol>
        </div>
        <div>
            {
                (this.state.stores==0)?null:
                this.state.stores.map((store)=>{
                    let id = store.sid;
                    return(
                        <ol className='c'>
                            <li style={{width:300}}>{store.mid}</li>
                            <li style={{width:100}}>{store.mname}</li>
                            <li style={{width:100}}>{store.mmoney}</li>
                            <li style={{width:100}}>{store.mstuid}</li>
                            <li style={{width:100}}>{store.mbuild}</li>
                            <li style={{width:100}}>{store.maccnum}</li>
                            <li style={{width:200}}>{store.mtime}</li>
                            <li style={{width:100}}>{store.mkind}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}