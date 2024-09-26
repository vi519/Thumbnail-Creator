import React from 'react'
import { generateRandomGradient } from '../ProcessFunction'
import './css/preview3.css'

function Preview3(props) {
 
  return (
    <div style={{marginTop:"10%"}}> <div
    style={{
        width: '1280px',
        height: '720px',
        display: 'flex',
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover'
   
    }}
>


<div className='card3' >


     <div className='headings3'>
    <div class="heading3">{props.heading}</div>
<div class="subHeading3">{props.subHeading}</div>
    </div>
        <div class="svg-content3">
        <div style={{height:"100px", width:"200px"}} dangerouslySetInnerHTML={{ __html: props.svgData[0].content }} />
        </div>


   
        
    </div>
    

</div></div>
  )
}

export default Preview3




