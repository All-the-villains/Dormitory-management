import React, { Component } from 'react'
import './Home.css'
import { Carousel, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 214,
            carouselImg: [
                { src: 'http://www.hebtu.edu.cn/resources/40/20210418204733997.jpg', id: 1 },
                { src: 'http://www.hebtu.edu.cn/resources/40/20210418152930290.jpg', id: 2 },
                { src: 'http://www.hebtu.edu.cn/resources/40/2021041815215385.jpg', id: 3 },
                { src: 'http://www.hebtu.edu.cn/resources/40/20210416222429393.jpg', id: 4 },
                { src: 'http://news.hebtu.edu.cn/resources/40/20210316125129000.jpg', id: 5 }
            ],
            networkarr: [
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon1.png', title: '教务系统',href:'http://jwgl.hebtu.edu.cn/xtgl/login_slogin.html;jsessionid=C93E8C4F97C97774E0765CFC199DC78A'},
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon2.png', title: '师大官网',href:'http://www.hebtu.edu.cn/' },
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon3.png', title: '网络教学平台',href:'http://wljx.hebtu.edu.cn/webapps/login/'},
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon5.png', title: '第二课堂',href:'http://202.206.100.221:8080/aexp/'},
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon6.png', title: '高校学生信息网',href:'https://www.chsi.com.cn/'},
                { src: 'http://jwc.hebtu.edu.cn/template/44//images/icon7.png', title: '河北省教育厅',href:'http://www.hee.cn/' }
            ]
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['1', '2', '3', '4', '5', '6'],
            });
        }, 100);

        fetch('/image', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    newsarr: res
                })
                console.log(this.state.newsarr)
            });

        fetch('/activity', {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    activity: res
                })
                console.log(this.state.activity)
            })
    }

    render() {
        return (
            <div className="container" >
                <div className='inputs'>
                    <input type='text' placeholder="请输入要查找的内容" className='search'></input>
                    {/* <div className="divinput">
                    <input placeholder="请输入要查找的内容" className='searchinput'></input>
                    </div> */}
                </div>
                <div style={{ width: '87%', margin: 'auto' }}>
                    <WingBlank>
                        <Carousel
                            autoplay
                            infinite
                        >
                            {
                                this.state.carouselImg.map((carouselImg) =>
                                    <img src={carouselImg.src} alt='' className='carouselimg' />
                                )
                            }
                        </Carousel>
                    </WingBlank>
                </div>
                <div className='block'>
                    <div className='news'>
                        <p className='news-Title'>论坛新闻</p>
                        <p className='newsMore'>更多+</p>
                        <hr className='firsthr'></hr>
                        {
                            (this.state.newsarr === undefined)
                                ? null
                                : this.state.newsarr
                                .sort(function(a,b){return (new Date(b.stime)).getTime() - (new Date(a.stime)).getTime()})
                                .map((news, idx) => (
                                    (idx < 5)
                                        ? <div className='newsContent'>
                                            <span className='time'>{news.stime.slice(5,7)+ '-' +news.stime.slice(8,10)}</span>
                                            <a href='/forum'>{news.shtext}</a>
                                            <hr></hr>
                                        </div>
                                        : null
                                ))
                        }
                    </div>
                    <div className='activity'>
                        <p className='activity-Title'>活动通告</p>
                        <p className='activityMore'>更多+</p>
                        <hr className='firsthr'></hr>
                        {
                            (this.state.activity === undefined)
                                ? null
                                :  this.state.activity
                                .sort(function(a,b){return (new Date(b.atime)).getTime() - (new Date(a.atime)).getTime()})
                                .map((activity, idx) => (
                                    (idx < 5)
                                        ? <div className='activityContent'>
                                            <span className='time'>{activity.atime}</span>
                                            <a href='/activity'>{activity.atitle}</a>
                                            <hr></hr>
                                        </div>
                                        : null
                                ))
                        }
                    </div>
                </div>
                <div className='network'>
                    <div style={{ marginLeft: '7%' }}>
                        <p className='network-Title'>网络门户</p>
                        <hr></hr>
                    </div>
                    <ul>
                        {
                            this.state.networkarr.map((networkarr) => (
                                <li>
                                    <a href={networkarr.href}>
                                        <img src={networkarr.src} />
                                        <p>{networkarr.title}</p>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <footer>
                    <p>版权所有河北师范大学    冀ICP备18011017号-3  </p>
                    <a href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13010802000630'>
                    <img src='http://www.hebtu.edu.cn/resources/40/20170303094702805.png' />
                    <span>冀公网安备 13010802000630号</span>
                    </a>
                    <p>地址：河北省石家庄市南二环东路20号 邮编：050024</p>
                </footer>
            </div>
        )
    }
}