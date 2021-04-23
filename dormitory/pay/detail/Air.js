import React, { Component,Fragment } from 'react'

class Air extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <Fragment>
                <div style={{marginTop:'50px',fontSize:'23px'}}>空调费</div>
                <div style={{width:'600px',borderTop:'2px #93BCD8 solid'}}>
                    <ul className='detail'>
                        <li>1234</li>
                        <li>56789</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
export default Air