import React from 'react'
import hebei from './title.png'
const Image = () => {
    return (
       <div style={{marginLeft:100,marginRight:100,borderTopWidth:3,borderTopColor:"blue",borderTopStyle:'solid'}}
       >
           <img src={hebei} style={{borderBottomWidth:2,borderBottomColor:"#ccc",borderBottomStyle:'solid'}}></img>
       </div>
        
    ) 
}
export default Image;