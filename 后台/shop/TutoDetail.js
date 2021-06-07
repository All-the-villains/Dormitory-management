import './TutoDetail.css'
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
 class TutoDetail extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        fetch('/fix', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({ users: res })
            })
    }
    reload() {
        this.props.history.go(0);
    }
    inputChangeFirst(e) {
        this.setState({
            id: e.target.value,
        })
    }
    eLogin=()=>{
        localStorage.removeItem('username')
        this.props.history.push({pathname:this.props.location.pathname})
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
    render() {
        return (<div>
            <input type='text' onChange={(e) => this.inputChangeFirst(e)} className='put3'></input>
            <button onClick={() => this.find()}>查询</button>
            <button style={{position:'absolute',left:1350,top:60,height:40,fontSize:25}}
                        onClick={()=>this.eLogin()}>退出登录</button>
            <div>
                <ol className='title'>
                    <li style={{ width: 100 }}>学号</li>
                    <li style={{ width: 100 }}>姓名</li>
                    <li style={{ width: 100 }}>宿舍楼</li>
                    <li style={{ width: 100 }}>宿舍号</li>
                    <li style={{ width: 300 }}>状况描述</li>
                    <li style={{ width: 200 }}>维修时间</li>
                    <li style={{ width: 100 }}>维修种类</li>
                    <li style={{ width: 80 }}>删除</li>
                </ol>
            </div>
            <div>
                {
                    (this.state.users == 0) ? null :
                        this.state.users.map((user) => {
                            return (
                                <ol className='con'>
                                    <li style={{ width: 100 }}>{user.fstuid}</li>
                                    <li style={{ width: 100 }}>{user.fname}</li>
                                    <li style={{ width: 100 }}>{user.fbuild}</li>
                                    <li style={{ width: 100 }}>{user.faccnum}</li>
                                    <li style={{ width: 300 }}>{user.fhappen}</li>
                                    <li style={{ width: 200 }}>{user.ftime}</li>
                                    <li style={{ width: 100 }}>{user.fkind}</li>
                                    <li style={{ width: 80 }}><button onClick={() => {
                                        fetch('/delfix', {
                                            method: 'post',
                                            mode: 'cors',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ "fid": user.fid }),
                                        }).then(setTimeout(this.reload.bind(this), 200))
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
export default withRouter(TutoDetail)