



import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Login from '../login/Login'
import DakaDetail from './DakaDetail'

 class Daka extends Component{
    constructor(props){
        super(props);
        this.state={
          data:'',

        }
    }
   handle=()=>{
       var key=localStorage.getItem('username')
       this.state.data=key
    //    console.log(this.state.data)
   }
   
    
    render(){
      
        return(
            <div onLoad={this.handle()}>
                {
                    (this.state.data==null)?<Login />:
                    <DakaDetail />
                }
            </div>
        )
    }

}
export default withRouter(Daka)