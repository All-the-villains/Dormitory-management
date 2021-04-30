import React, { Component } from 'react'




let storage=window.localStorage;


export default class Det extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data: [

          ]
        }
      }

    componentDidMount(){
      fetch('/comment',{
          method:'get',
          mode:'cors',
          headers:{'Content-Type':'application/json'},
      }).then(res=>res.json())
      .then(res=>{
        this.setState({
          data: res
        })
        console.log(this.state.data)
      })
      console.log(storage.getItem('use'))
  
  
  

  }
    
    render() {
      const v1={
        width:'80%',height:'200px',backgroundColor:'#C3D8EA',float:'left',marginLeft:'10%',marginTop:'10px',
      

      }
      const pauthor={
        float:"left",
        position:'absolute',
        marginLeft:'1%',
        marginTop:'160px',
        fontSize:'20px'
      } 
      const ptext={
        float:"left",
        marginLeft:'15%',
        marginTop:'60px',
        position:'absolute',
        fontSize:'30px'
        
      }
      const ptime={
        float:"right",
        marginTop:'170px',
        marginRight:'2%',
        position:'relative',
        fontSize:'20px'
      }
      

        return (
              <div >
                <div style={v1}>
                  <img src={JSON.parse(storage.getItem('use')).shimg} style={{width:'150px',height:'150px',position:'absolute'}}></img>
                  <p style={pauthor}>发布人:{JSON.parse(storage.getItem('use')).shname}</p>
                  <p style={ptext}>{JSON.parse(storage.getItem('use')).shtext}</p>
                  <p style={ptime}>{JSON.parse(storage.getItem('use')).stime}</p>
                </div>

                <div style={{float:'left',width:'80%',height:'50px',marginLeft:'10%',marginTop:'20px'}}> 
                  <p style={{fontSize:'20px'}}>回复:</p>
                </div>
                {


this.state.data.map((item,key) =>{
  if(item.cshid==JSON.parse(storage.getItem('use')).shid)
  return(
  <div key={key} style={{  width:'80%',height:'100px',backgroundColor:'#F2F5FD',float:'left',marginLeft:'10%',marginTop:'10px'}} >
    <p style={{float:"left",position:'absolute',fontSize:'20px',marginTop:'40px',marginLeft:'60%'}}>{item.cname}&nbsp;:&nbsp;&nbsp;{item.ctext}</p>
   
   
    </div> 
  
  )
    
})


                }

            </div>
            
                

   
        );
    }


    
}