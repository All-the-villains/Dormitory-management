import React, { Component,Fragment } from 'react'

class Lodging extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Fragment>
                <div style={{marginTop:'50px',fontSize:'23px'}}>住宿费</div>
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
export default Lodging