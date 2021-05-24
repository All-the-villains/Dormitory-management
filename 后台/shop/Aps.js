import React, { Component } from 'react'
 class Aps extends Component{
    constructor(){
        super();
        this.state={
          data:[],
        }
    }
    componentDidMount(){
        fetch('/upload',{
            method:'post',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
            
        })
        .then(res=>{
            console.log(res)
        })
    }
   
    render(){
        return(
            <div>
                
            </div>
        )
    }

}
export default Aps