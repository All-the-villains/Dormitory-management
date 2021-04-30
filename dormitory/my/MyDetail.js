import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { isIfStatement, tsImportEqualsDeclaration } from '@babel/types';

 class My extends Component{
    constructor (props) {
        super(props)
        this.state={
            img:'',
            data:[],
            un:'',
            ps:''
        }
        this.file = React.createRef()
    }
    componentDidMount(){
      fetch('/student',{
          method:'get',
          mode:'cors',
          headers:{'Content-Type':'application/json'},
      }).then(res=>res.json())
      .then(res=>{
          this.setState({data:res})  
          let un=localStorage.getItem('username')
          let ps=localStorage.getItem('password')
          for(var i=0;i<this.state.data.length;i++){
              if(un==this.state.data[i].stuid && ps==this.state.data[i].stupass){
                  this.setState({
                    data:this.state.data[i],
                    img:this.state.data[i].stuimg
                  })  
              }
          }
          // console.log(this.state.data)  

      })
    }
    
    eLogin=()=>{
        localStorage.removeItem('username')
        this.props.history.push({pathname:this.props.location.pathname})
    
    }
    handlerChange () {
        const that = this
        const file = this.file.current.files[0]
        if (file.type !== 'image/png') {
          alert('请上传png图片')
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (result) {
          console.log(this.result)
          that.setState({
            img: this.result
          })
        }
    }

     render(){
         return(
            <div >
                 <input type="file" ref={this.file} accept="image/*" hidden onChange={ this.handlerChange.bind(this) }/>
                 <img src={ this.state.img} alt="" style={{ width: 150,position:'absolute',left:220,top:180,borderStyle:'solid',borderColor:'red',borderRadius:50}}/>
             
					       <a
						        onClick={() => {
							        this.file.current.click()
						        }}
						        style={{
                            // height: '39px',
                            // lineHeight: '39px',
                            position:'absolute',
                            top:350,
                            left:235,
                            fontSize:20
                            
                        }}
					      >修改个人头像</a>
                <div style={{position:'absolute',top:180,left:525}}>
                      <p style={{fontSize:22}}>姓名：{this.state.data.stuname}</p>
                      <p style={{position:'relative',top:15,fontSize:22}}>性别：{this.state.data.stusex}</p>
                      <p style={{position:'relative',top:30,fontSize:22}}>学号：{this.state.data.stuid}</p>
                </div>
                <div style={{position:'absolute',top:180,left:800}}>
                      <p style={{fontSize:22}}>学院：{this.state.data.stusch}</p>
                      <p style={{position:'relative',top:15,fontSize:22}}>宿舍：{this.state.data.stuaccnum}</p>
                </div>
                <button style={{position:'absolute',left:1200,top:150,height:30}}
                        onClick={()=>this.eLogin()}>退出登录</button>
                
            </div>
         )
     }
 }
 export default withRouter(My)