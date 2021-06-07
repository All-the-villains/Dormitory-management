import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Login from './Login'
import ListDetail from './ListDetail'

 class List extends Component{
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
                    <ListDetail />
                }
            </div>
        )
    }

}
export default withRouter(List)