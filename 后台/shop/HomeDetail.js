import React, { Component } from 'react'
import './HomeDetail.css'
import {withRouter} from 'react-router-dom'
class HomeDetail extends Component {
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
    eLogin=()=>{
        localStorage.removeItem('username')
        this.props.history.push({pathname:this.props.location.pathname})
    }
    render() {
        return(
            <div>
                <button style={{position:'absolute',left:1270,top:60,height:40,fontSize:25}}
                        onClick={()=>this.eLogin()}>退出登录</button>
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
export default withRouter(HomeDetail)