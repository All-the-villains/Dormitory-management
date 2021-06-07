import './BlogDetail.css'
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class BlogDetail extends Component {
    constructor(){
        super();
        this.state={
            id:'',
          texts:[],
        }
    }
    componentDidMount(){
        fetch('/todolist',{
            method:'get',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
        }).then(res=>res.json())
        .then(res=>{
            this.setState({texts:res})
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
    eLogin=()=>{
        localStorage.removeItem('username')
        this.props.history.push({pathname:this.props.location.pathname})
    }
    find() {
        if (this.state.id == '') {
            alert('未输入学号。请输入学号')
        } else {
            fetch('/searchtodolist', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "tostuid": this.state.id }),
            }).then(res => {
                //console.log(JSON.stringify(param))
                if (res.status === 200) {
                    res.json().then(res=>{
                        this.setState({ texts:res })
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
        return(<div>
            <input type='text'  onChange={(e)=>this.inputChangeFirst(e)} className='put4'></input>
            <button onClick={() =>this.find()}>查询</button>
            <button style={{position:'absolute',left:1200,top:60,height:40,fontSize:25}}
                        onClick={()=>this.eLogin()}>退出登录</button>
            <div>
                <ol className='ti'>
                    <li style={{width:200}}>学生学号</li>
                    <li style={{width:300}}>打卡时间</li>
                    <li style={{width:100}}>打卡结果</li>
                </ol>
            </div>
        <div>
            {
                (this.state.texts==0)?null:
                this.state.texts.map((text)=>{
                    return(
                        <ol className='co'>
                            <li style={{width:200}}>{text.tostuid}</li>
                            <li style={{width:300}}>{text.totime}</li>
                            <li style={{width:100}}>{text.tores}</li>
                        </ol>
                    )
                })
            }
        </div>
    </div>)
    }
}
export default withRouter(BlogDetail)