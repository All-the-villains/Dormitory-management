
import React, { Component } from 'react'
import'./forum.css'
import { Link } from 'react-router'
import img from './image/head1.jpg'


let storage=window.localStorage;

var tabout=[  {
  img:'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg',
  title:'标题1',
  author:'金蛋蛋',
  text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  time:'2021-4-21'
},
{
img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2866403361,754664073&fm=26&gp=0.jpg',
title:'标题2',
author:'粉星星',
text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
time:'2021-4-21'
},
{
img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2585259936,2874589954&fm=26&gp=0.jpg',
title:'标题3',
author:'黄方块',
text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
time:'2021-4-21'
},
{
img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=283222136,2417804691&fm=11&gp=0.jpg',
title:'标题4',
author:'绿章鱼',
text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
time:'2021-4-21'
},
{
img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1734386620,3931756485&fm=26&gp=0.jpg',
title:'标题5',
author:'比奇堡统治者',
text:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
time:'2021-4-21'
}]

export default class Forum extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data: [

          ]
        }
      }
    //   componentDidMount(){
    //     fetch('/text',{
    //         method:'get',
    //         mode:'cors',
    //         headers:{'Content-Type':'application/json'},
    //     }).then(res=>res.json())
    //     .then(res=>{
    //         this.setState({texts:res})
    //     })
    // }
    //   getData = () => {
    //     console.log('respond');
    //     fetch('/text')
    //       .then(response => response.json()
    //       ).then((json) => {
    //         // for(var i=0;i<tabout.length;i++){
    //         //   storage.setItem('image'+i,tabout[i].img)
    //         //   storage.setItem('title'+i,tabout[i].title)
    //         //   storage.setItem('author'+i,tabout[i].author)
    //         //   storage.setItem('text'+i,tabout[i].text)
    //         //   storage.setItem('time'+i,tabout[i].time)
    //         // }
    //         // //用到this需要注意指向，箭头函数
    //         // this.setState({
    //         //   data: tabout
    //         // })
    //         // console.log(this.state.data)
    //         console.log(response);
    //       }).catch(error => console.log('error is', error))
    //   }
    componentDidMount(){
      fetch('/image',{
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
              <div>          
{
  
  this.state.data.map((item,key) =>{
    return(
    <div key={key} style={v1} >
      <img src={item.shimg} style={{width:'150px',height:'150px',position:'absolute'}}/>
      <p style={pauthor}>发布人:{item.shname}</p>
      <p style={ptext} onClick={(props) => {
      this.props.history.push('/home/detail')

      storage.setItem('use', JSON.stringify(item));
    }}>{item.shtext}</p>
      <p style={ptime}>{item.stime}</p>
      </div> 
    
    )
      
  })
}
</div>  


       
        <textarea  id='talk' cols="250" rows="100%" style={{width:'80%',height:'200px',marginLeft:'10%',marginTop:'20px'}}
        onFocus={ function () {
          if(document.getElementById('talk').value==""){
            
          document.getElementById('letter').style.display='block'
          }
          else{
           
            document.getElementById('letter').style.display='none'
          }
         
        }}></textarea> 
        <p  style={{color:"#777",marginLeft:'10%'}} id='letter'>*请输入内容</p>
     {
        <input type="submit" value="发送" style={{width:'20%' ,height:'50px',marginLeft:'40%',marginTop:'20px',marginBottom:'10px',backgroundColor:'#C6D8EA'}} 
        onClick={function() {
         
        var talk=document.getElementById('talk').value
          fetch('/shadd',{
            method:'post',
            mode:'cors',
            headers:{'Content-Type':'application/json'},

            data:{
            shid:"1616422914457",
            shimg:'https://img1.baidu.com/it/u=3480070665,2380656812&fm=26&fmt=auto&gp=0.jpg',
            shname:'葫芦娃',
            shtext:talk,
            stime:'2021-4-21'

            }
        }).then(res=>res.json())
        .then(res=>{
          this.setState({
            data: res
          })
          console.log(this.state.data)
        })            
        }}/>}

            </div>
            
                

   
        );
    }


    
}