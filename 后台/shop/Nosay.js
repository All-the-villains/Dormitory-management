import React, { Component } from 'react'
import './law.css'
import {  Table } from 'antd';

export default class Nosay extends Component {
    constructor(){
        super();
        this.state={
          nosay:[],
        }
    }
    componentDidMount(){
      fetch('https://www.responsibility.pro:6060/user')
      .then(res=>res.json())
      .then(res=>{
          console.log(res);
          this.setState({nosay:res})
      })
    }
  // componentDidUpdate(prevProps) {
  //   // only update if the data has changed
  //   this.getAPIData()
  //   .then(data => {
  //     if (prevProps.data !== this.state.lawyer.data) {
  //       this.setState({
  //         lawyer: data
  //       });
  //     }
  //     console.log(data);
  //   });
  //   }
    render(){
      const columns = [
        {
          title:'id',
          dataIndex:'uid'
        },
        {
          title:'likes',
          dataIndex:'uname'
        },
        {
          title: '名字',
          dataIndex: 'name',
          
        },
        {
            title:'上次言论时间',
            dataIndex:'date'
        },
        {
            title:'上次言论内容',
            dataIndex:'text'
        },
        // {
        //   title:'取消禁言',
        //   dataIndex:'id',
        //   render(record) {
        //     function a(number){
        //       fetch('https://www.responsibility.pro:2347/nosaybtn/' + number);
        //     }
        //     return(
        //       <button id = "consult" class = "btnstyle btn1" onClick={()=>a({record}.record)}>
        //       取消禁言</button>
        //     )}
        // },
      ];
      return (
          <div id="box">
               <Table id="customers"  columns={columns} dataSource={this.state.nosay} />
          </div>
      );
  }
}