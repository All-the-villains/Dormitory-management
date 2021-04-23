import React, { Component,Fragment } from 'react'

class Water extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Fragment>
                <div style={{marginTop:'50px',fontSize:'23px'}}>水卡充值</div>
                <div style={{width:'600px',borderTop:'2px #93BCD8 solid'}}>
                    <ul className='detail'>
                        <li>123</li>
                        <li>456</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
export default Water