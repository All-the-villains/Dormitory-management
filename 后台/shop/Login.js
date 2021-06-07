import React,{Component} from 'react'
import {withRouter } from 'react-router-dom'

import './Login.css'
class Login extends Component {
    constructor(){
        super();
        this.state={
          data:[],
          username:'',
          password:'',
          datalist:[]
        }
    }
    // componentDidMount(){
    //     fetch('/userinf',{
    //         method:'get',
    //         mode:'cors',
    //         headers:{'Content-Type':'application/json'},
    //     }).then(res=>res.json())
    //     .then(res=>{
    //         // console.log(res)
    //         this.setState({data:res})   
 
    //     })
    // }
    inputChange(){
        //获取dom节点元素
        //1.添加ref属性
        //2.使用this.refs.username获取dom节点
        let val=this.refs.username.value;
        this.setState({
            username:val
        })
        
    }
    inputText(){
        let val1=this.refs.password.value;         
        this.setState({
            password:val1
        })
        
    }
  
    loginConfirm(){ 
        // console.log(this.state.username)
        // console.log(this.state.data)
        // console.log(this.state.data[0].username.length)
        // for(var i=0;i<this.state.data.length;i++){
        //     if(this.state.username==this.state.data[i].username && this.state.password==this.state.data[i].passwd){
        //         this.state.datalist[0]=this.state.data[i].username
        //         this.state.datalist[1]=this.state.data[i].passwd
        //         console.log(this.state.datalist)
        //         // console.log(this.props.location.pathname)        
        //     }
        // }
       
        if(this.state.username){
            if(this.state.password){
                if((this.state.username=='admin' && this.state.password=='123456') || (this.state.username=='fakerAdmin' && this.state.password=='123456')){
                    localStorage.setItem('username',this.state.username)
                    localStorage.setItem('password',this.state.password)
                    this.props.history.push({pathname:this.props.location.pathname})
                }
                else{
                    alert('用户名或者密码错误')
                }
            }
            else{
                alert('密码为空,请输入密码')
            }
            
        }
        else{
            alert('用户名或密码为空')
        }
        console.log(this.state.username)
        
    }
   render(){
        return (
            <div>
                <div class='div'>
                    <div class='username'>
                        <input type='text' ref='username' onChange={()=>this.inputChange()} style={{height:30,width:300,marginLeft:25,marginTop:40,backgroundColor:'#EEEEEE'}} placeholder='学号'/>
                    </div>
                    <div class='password'>
                        <input type='password' ref='password' onChange={()=>this.inputText()} style={{height:30,width:300,marginLeft:25,marginTop:40,backgroundColor:'#EEEEEE'}} placeholder='密码'/>
                    </div>  
                    <button onClick={()=>this.loginConfirm()}
                            id='login'>登录</button>
                </div>
            </div>
        )
   }
}

export default withRouter(Login)
