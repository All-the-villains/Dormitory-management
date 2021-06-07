import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Login from './Login'
import CommDetail from './CommDetail'

 class Comm extends Component{
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
                    <CommDetail />
                }
            </div>
        )
    }

}
export default withRouter(Comm)