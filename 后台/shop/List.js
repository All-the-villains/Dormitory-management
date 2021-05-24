import './List.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            lists: [],
            title:'',
            rando:'',
            time1:'',
            time2:'',
            date:null,
            textarea:''
        }
    }
    componentDidMount() {
        fetch('/activity', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({ lists: res })
                console.log(res)
            })
    }
    reload(){
        this.props.history.go(0);
    }
   
      
    random(){
        // 请求的url
        const url="/actadd";
        // 请求的参数
        const param={
          aid:this.state.rando,
          atime:this.state.date,
          aperiod:''+this.state.time1+'至'+this.state.time2,
          atitle:this.state.title,
          atext:this.state.textarea
        };
        // 调用fetch
        fetch(url,{
            // 请求方式
            method:'POST',
            mode:'cors',
            // 将请求的参数转成json
            body:JSON.stringify(param) ,
            // 请求头
            headers: {
                'content-type': 'application/json'
            }
        // 请求的返回值
        }).then(res=>{
          console.log(JSON.stringify(param))
            if(res.status===200){
                res.json().then(function (data) {
                    // 获取请求的返回字段
                    console.log(JSON.stringify(param));
                })
                .then(res=>{
                  console.log(res.json())
                })
            }else {
                alert("出现一个问题");
            }
            setTimeout(this.reload.bind(this), 200)
      
        })
    }
    inputChangeFirst(e){
        this.setState({
            title:e.target.value,
        })
    }
    inputChangeSecond(){
        let value=$("#date").val()
        this.setState({
            date:value
        })
        
    }
    inputChangeThird(){
        let value=$("#time1").val()
        this.setState({
            time1:value
        })
    }
    inputChangeForth(){
        let value=$("#time2").val()
        this.setState({
            time2:value
        })
    }
    inputChangeFifth(){
        let value=$("#textarea").val()
        this.setState({
            textarea:value
        })
        let a=parseInt(Math.random()*10)
        let b=parseInt(Math.random()*10)
        let c=parseInt(Math.random()*10)
        let d=parseInt(Math.random()*10)
        let e=parseInt(Math.random()*10)
        let f=parseInt(Math.random()*10)
        let g=parseInt(Math.random()*10)
        let h=parseInt(Math.random()*10)
        let random=''+a+b+c+d+e+f+g+h
        this.setState({
           rando:random
        })
    }
    render() {
        return (
            <div>
                <div>
                    <ol className='tit'>
                        <li style={{ width: 100 }}>活动号</li>
                        <li style={{ width: 100 }}>发布时间</li>
                        <li style={{ width: 200 }}>发布标题</li>
                        <li style={{ width: 200 }}>持续时间</li>
                 
                        <li style={{ width: 50 }}>删除</li>
                    </ol>
                </div>
                <div>
                    {
                        (this.state.lists == 0) ? null :
                            this.state.lists.map((list,idx) => {
                                return (
                                    <ol className='conn' key={{idx}}>
                                        <li style={{ width: 100 }}>{list.aid}</li>
                                        <li style={{ width: 100 }}>{list.atime}</li>
                                        <li style={{ width: 200 }}>
                                            <Link to={{pathname:"/value",state:{key1:idx,data:this.state.lists}}} style={{marginLeft:20}}>
                                                {list.atitle}
                                            </Link>
                                        </li>
                                        <li style={{ width: 200 }}>{list.aperiod}</li>
                                        
                                        <li style={{ width: 50 }}><button onClick={() => {
                                            fetch('/delact', {
                                                method: 'post',
                                                mode: 'cors',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ "aid": list.aid }),
                                            }).then(setTimeout(this.reload.bind(this), 200))
                                        }
                                        }>删除</button></li>
                                    </ol>
                                )
                            })
                    }
                </div>

                <div className='tit1'>
                    <p style={{ marginLeft: -550, marginTop: 20 }}>
                        标题：<input type='text'  onChange={(e)=>this.inputChangeFirst(e)} style={{ height: 30, width: 200, fontSize: 20 }}></input>
                    </p>
                    <br></br>
                    <p style={{ marginLeft: -520 }}>
                        活动日期：<input type='date' id='date' onChange={()=>this.inputChangeSecond()}  style={{ height: 30, width: 200, fontSize: 20 }}></input>
                    </p>
                    <br></br>
                    <p style={{ marginLeft: -300 }}>
                        活动持续日期：<input type='date' id='time1' onChange={()=>this.inputChangeThird()} style={{ height: 30, width: 180, fontSize: 20 }}></input>至
                                        <input type='date' id='time2' onChange={()=>this.inputChangeForth()}  style={{ height: 30, width: 180, fontSize: 20 }}></input>
                    </p>
                    <br></br>
                    <p style={{ marginLeft: -300 }}>
                        <p style={{ marginLeft: -460 }}>内容：</p>

                        <textarea style={{ height: 250, width: 550, marginLeft: 130, fontSize: 20 }} id='textarea' onChange={()=>this.inputChangeFifth()}></textarea>
                    </p>
                    <button style={{ fontSize: 30, marginTop: 20, marginLeft: -50, width: 100 }} onClick={()=>this.random()}>提交</button>
                </div>

            </div>

        )
    }
}

