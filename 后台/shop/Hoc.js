import React, { Component } from 'react'

const withFetch=(Com,url)=>{
    // return class Topic extends Component{
    class Topic extends Component{
        constructor(){
            super();
            this.state={
                data:[]
            }
        }
        componentDidMount(){
            fetch(url).then(res=>res.json()).then(res=>this.setState({data:res.data}))
        }
        render(){
            // return <Com  data={this.state.data}/>
            return <Com {...this.props} data={this.state.data}/>
        }
    }
    Topic.displayName='withFetch(${Com})';
    return Topic;
}

const De =(props)=>{
    return <div>
        <h1>标题</h1>
        <div>{props.data.content}</div>
        </div>
}

export const Detail=withFetch(De,'https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312');

// class Hoc extends Component {
// constructor(){
//     super();
//     this.state={
//         data:[]
//     }
// }
// componentDidMount(){
//     fetch('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312').then(res=>res.json()).then(res=>this.setState({data:res.data}))
// }
//     render() {
//         console.log(this.state.data);
//         return (
//             <div>
//                 Hoc
//             </div>
//         )
//     }
// }
const Ho =(props)=>{
    console.log(props.data);
    return<ul>
        {
            props.data.map((item)=><li>{item.title}</li>)
        }
    </ul>
}
const Hoc = withFetch(Ho,'https://cnodejs.org/api/v1/topics')
export default Hoc;