import './Daka.css'
import React, { Component } from 'react'
import AMap from 'AMap';
export default class Daka extends Component {
    Rad(d) {
        return d * Math.PI / 180.0;
    }
    handleMap() {
        console.log(window.lat)
        console.log(window.lng)
        var radLat1 = this.Rad(window.lat);
        var radLat2 = this.Rad(37.997294);
        var a = radLat1 - radLat2;
        var b = this.Rad(window.lng) - this.Rad(114.520548);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2)  //保留两位小数
        // console.log(s)
        if (s < 1.0) {
            alert('打卡成功')
        }
        else {
            alert('不在范围内')
        }

    }

    render() {
        return (
            <div className='Daka'>
                <div className='address' id="container" >

                </div>
                <button class='but' onClick={() => this.handleMap()}>打卡</button>
            </div>
        )
    }
    componentDidMount(){
        let lat1 = 0,
            lng1 = 0;
        setTimeout(() => {
            //console.log(window.lat);
            //console.log(window.lng);
            lat1 = window.lat;
            lng1 = window.lng;
        },1000); //因为放在react的html和其他js文件是同时执行的，所以在其他页面请求的时候可能获取不到值，所以用延时器的方式能够获取到
        var map = new AMap.Map('container',{
            zoom: 10,  //设置地图显示的缩放级别
            center: [lng1,lat1],//设置地图中心点坐标
            layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
            mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
            viewMode: '2D',  //设置地图模式
            lang:'zh_cn',  //设置地图语言类型
        });
        
    }

}