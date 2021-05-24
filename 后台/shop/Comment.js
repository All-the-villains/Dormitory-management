import React, { Component } from 'react'
import './Comment.css'
export default class Guide extends Component {
    constructor(){
        super();
        this.state={
          comments:[],
        }
    }
    componentDidMount(){
        if(!this.props.location.state){
            fetch('/comment',{
                method:'get',
                mode:'cors',
                headers:{'Content-Type':'application/json'},
            }).then(res=>res.json())
            .then(res=>{
                this.setState({comments:res})
            })
        }
        else{
            let id=this.props.location.state.id        
            fetch('/searchid/'+encodeURI(id),{
                method:'post',
                mode:'cors',
                headers:{'Content-Type':'application/json'},
            }).then(res=>res.json())
            .then(res=>{
                this.setState({comments:res})
            })
        }
    }
    reload(){
        this.props.history.go(0);
    }
    render() {
        return(<div>
        <div>
            <ol className='t2'>
                <li>评论id</li>
                <li>评论人昵称</li>
                <li style={{width:700}}>评论内容</li>
                <li style={{width:80}}>删除评论</li>
            </ol>
        </div>
        <div>
            {
                (this.state.comments==0)?null:
                this.state.comments.map((comment)=>{
                    return(
                        <ol className='c2'>
                            <li>{comment.cid}</li>
                            <li>{comment.cname}</li>
                            <li style={{width:700}}>{comment.ctext}</li>
                            <li style={{width:80}}><button onClick={()=>{
                                fetch('/delcom',{
                                    method:'post',
                                    mode:'cors',
                                    headers:{'Content-Type':'application/json'},
                                    body:JSON.stringify({"cid":comment.cid}),
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