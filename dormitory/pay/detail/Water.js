import React, { Component,Fragment } from 'react'

class Water extends Component {
    constructor(){
        super();
        this.state={
            user:[]
        }
    }
    componentDidMount(){
        fetch('/money',{
            method:'get',
            mode:'cors',
            headers:{'Content-Type':'application/json'}
        }).then(res=> res.json())
        .then(res=>{
            console.log(res);
            this.setState({user:res})
            console.log('查询成功')
        })
    }
    getData(idx){
        let arr=this.state.user;
        for (var i = idx; i < arr.length; i++) {
            return (
                <Fragment>
                    <div style={{marginTop:'50px',fontSize:'23px'}}>水卡充值</div>
                    <div style={{width:'600px',borderTop:'2px #93BCD8 solid'}}>
                        <img style={{ width:'170px',height:'170px',float:'right',marginTop:'20px',
                            marginRight:'30px',borderRadius:'100px' }}
                            src={arr[3].mimg}/>
                        <ul className='detail'>
                            <li>学号：{arr[3].mstuid}</li>
                            <li>姓名：{arr[3].mname}</li>
                            <li>宿舍：{arr[3].maccnum}</li>
                            <li>缴费金额：{arr[3].mmoney}</li>
                        </ul>
                        <button style={{ width:'100px',height:'50px',marginTop:'20px',fontSize:'17px',
                            backgroundColor:'#93BCD8',border:'0',borderRadius:'15px' }}
                            onClick={res=>console.log('缴费成功')}>点击缴费</button>
                    </div>
                </Fragment>
            )
        }
    }
    render() {
        return (
            <Fragment>
                {this.getData(0)}
            </Fragment>
        )
    }
}
export default Water