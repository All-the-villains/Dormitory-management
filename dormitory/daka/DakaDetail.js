import './Daka.css'
import React, { Component } from 'react'
// import { Map, Marker } from 'react-amap'
// import { Form, FormItem, Input, AMap, getFieldDecorator, setFieldsValue, getFieldValue } from 'react'


class DakaDetail extends Component {
    constructor() {
        super();
    }
    //搜索的过程中使用高德地图地理编码将地址转化成经纬度，如果要实现第二个需求，需要使用逆地理编码从地图上获取经纬度在转化成地址
    // onSearchAddress = () => {
    //     var address = this.mRegion;
    //     fetch('https://restapi.amap.com/v3/geocode/geo?key=320f4399064a7d0643ec6bddddf04d15' & address == '+address')
    //         .then(res => {
    //             if (res.ok) {
    //                 res.json().then(data => {
    //                     this.setState({ dict: data });
    //                     var list = this.state.dict.geocodes;
    //                     var geocodes = list[0]['location'].split(',');
    //                     this.mLng = parseFloat(geocodes[0]); //经度
    //                     this.mLat = parseFloat(geocodes[1]); //维度
    //                     this.setState({
    //                         longitude: this.mLng,
    //                         latitude: this.mLat,
    //                     })
    //                 })
    //             }
    //         });
    //     this.setState({})
    // };
    render() {
        return (
            <div style={{ width: '500px' }}>
                {/* <Map amapkey={'320f4399064a7d0643ec6bddddf04d15'} zoom={6} plugins={['ToolBar']}>
                    <Marker position={{ longitude: this.state.longitude, latitude: this.state.latitude }} />
                </Map> */}
                这是地图打卡
            </div>

        )
    }
}

export default DakaDetail;