import React, { Component,Fragment } from 'react'

class Meal extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Fragment>
                <div style={{marginTop:'50px',fontSize:'23px'}}>饭卡充值</div>
                <div style={{width:'600px',borderTop:'2px #93BCD8 solid'}}>
                    <ul className='detail'>
                        <li>1234567</li>
                        <li>456789</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
export default Meal