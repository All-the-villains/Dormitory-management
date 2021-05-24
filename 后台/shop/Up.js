import React, { Component } from 'react'
import './Up.css'
export default class Up extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            users: [],
        }
    }
    inputChangeFirst(e) {
        this.setState({
            id: e.target.value,
        })
    }
    componentDidMount() {
        fetch('/student', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({ users: res })
            })
    }

    find() {
        if (this.state.id == '') {
            alert('未输入学号。请输入学号')
        } else {
            fetch('/searchstudent', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "stuid": this.state.id }),
            }).then(res => {
                //console.log(JSON.stringify(param))
                if (res.status === 200) {
                    res.json().then(res=>{
                        this.setState({ users:res })
                    },(err)=>{
                        console.log('失败'+err)
                        alert('学号输入有误')
                    }
                    )
                }
            }
            )
        }
    }
    render() {
        return (<div>
            <input type='text' onChange={(e) => this.inputChangeFirst(e)} className='put1'></input>
            <button onClick={() => this.find()}>查询</button>
            <ol className='title11'>
                <li style={{ width: 150 }}>学生学号</li>
                <li style={{ width: 100 }}>姓名</li>
                <li style={{ width: 50 }}>性别</li>
                <li style={{ width: 100 }}>宿舍楼</li>
                <li style={{ width: 100 }}>宿舍号</li>
            </ol>
            <div>
                {
                    (this.state.users == 0) ? null :
                        this.state.users.map((user, idx) => {
                            return (
                                <ol className='con11' key={{ idx }}>
                                    <li style={{ width: 150 }}> {user.stuid}</li>
                                    <li style={{ width: 100 }}>{user.stuname}</li>
                                    <li style={{ width: 50 }}>{user.stusex}</li>
                                    <li style={{ width: 100 }}>{user.stubui}</li>
                                    <li style={{ width: 100 }}>{user.stuaccnum}</li>
                                </ol>

                            )
                        })
                }
            </div>
        </div>)
    }
}