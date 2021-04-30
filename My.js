import React from 'react';
import axios from 'axios'
export default class My extends React.Component{
                     constructor(props){
                           super(props);
                           this.state={
                                imgurl:''
                           }
                     }
                     
                     componentDidMount(){
                           
                     }
                     load(){
                           this.refs.loading.style.display="block"
                           let file=this.refs.file
                           console.log(file.files[0])
                           let forData=new FormData
                           forData.append('headfile',file.files[0])
                           var url="http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
                           axios({
                                method:"post",
                                url:url,
                                data:forData
                           }).then(res=>{
                           this.refs.loading.style.display="none"
                                
                                console.log(res.data)
                                if(res.data.code==200)
                                {
                                     let temp="//vueshop.glbuys.com/userfiles/head/"
                                     this.setState({
                                           imgurl:temp+res.data.data.msbox
                                     })
                                }
                           })
                     }
                     
                     
                     
                     //jsx
                     render(){
                           return(
                                <div className="zong">
                                     <div className="loading" ref="loading">上传中....</div>
                                     <input type="file" ref="file" onChange={this.load.bind(this)}/>
                                     <img src={this.state.imgurl}/>
                                </div>
                                
                           )
                
                 }
                
                
                     
                }
     
     
