import './CommDetail.css'
import React, { Component } from 'react'
import {NavLink,withRouter} from 'react-router-dom'
class CommDetail extends Component {
    constructor(){
        super();
        this.state={
            id:'',
          shares:[],
        }
    }
    componentDidMount(){
        fetch('/bbbb',{
            method:'get',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
        }).then(res=>res.json())
        .then(res=>{
            this.setState({shares:res})
        })
    }
    reload(){
        this.props.history.go(0);
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
            fetch('/searchbbbb', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "bstu": this.state.id }),
            }).then(res => {
                //console.log(JSON.stringify(param))
                if (res.status === 200) {
                    res.json().then(res=>{
                        this.setState({ shares:res })
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
    eLogin=()=>{
        localStorage.removeItem('username')
        this.props.history.push({pathname:this.props.location.pathname})
    }
    render() {
        return(<div>
        <input type='text'  onChange={(e)=>this.inputChangeFirst(e)} className='put5'></input>
        <button onClick={() =>this.find()}>查询</button>
        <button style={{position:'absolute',left:1270,top:50,height:40,fontSize:25}}
                        onClick={()=>this.eLogin()}>退出登录</button>
        <div>
            <ol className='t1'>
                <li style={{width:150}}>头像</li>
                <li style={{width:90}}>昵称</li>
                <li style={{width:550}}>发帖内容</li>
                <li style={{width:160}}>发帖时间</li>
                <li style={{width:70}}>查看评论</li>
                <li style={{width:80}}>删除</li>
            </ol>
            
        </div>
        <div>
            {
                (this.state.shares==0)?null:
                this.state.shares.map((share)=>{
                    let id=share.shid;
                    return(
                        <ol className='c1'>
                            <li style={{width:150}}><img src={share.bimg} className='tu'/></li>
                            <li style={{width:90}}>{share.bname}</li>
                            <li style={{width:550}}>{share.btext}</li>
                            <li style={{width:160}}>{share.btime}</li>
                            <li style={{width:70}}>
                                <NavLink style={{color:'black'}} to={{pathname:'/comment',state:{id:share.bid}}}>查看评论</NavLink>
                            </li>
                            <li style={{width:80}}><button onClick={()=>{
                                fetch('/delbbb',{
                                    method:'post',
                                    mode:'cors',
                                    headers:{'Content-Type':'application/json'},
                                    body:JSON.stringify({"bid":share.bid}),
                                }).then(setTimeout(this.reload.bind(this),200))
                            }
                            }>删除</button></li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}


export default withRouter(CommDetail)