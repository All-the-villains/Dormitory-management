import React, { Component } from 'react'
import './Home.css'
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            lists: [],

        }
    }
    componentDidMount() {
        fetch('/manage', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({ lists: res })
                console.log(res)
            })
    }
    render() {
        return(
            <div>
                <ol className='title1'>
                    <li style={{width:300}}>宿管照片</li>
                    <li style={{width:150}}>姓名</li>
                    <li style={{width:250}}>联系电话</li>
                    <li style={{width:250}}>管理区域</li>
                </ol>
                <div>
                    {
                        (this.state.lists == 0) ? null :
                            this.state.lists.map((list,idx) => {
                                return (
                                    <ol className='con1' key={{idx}}>
                                        <li style={{width:300}}>
                                            <img src={list.maimg} className='tu1'></img>
                                        </li>
                                        <li style={{width:150}}>{list.maname}</li>
                                        <li style={{width:250}}>{list.matel}</li>
                                        <li style={{width:250}}>{list.mabuild}</li>
                                    </ol>
                                    
                                )
                            })
                    }
                </div>
      
            </div>
        )
    }
}