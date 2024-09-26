import React, { useState } from 'react'
import { colors, generateRandomGradient } from '../ProcessFunction'
import './css/preview1.css'


function Preview1(props) {

  const [backgroundColor, setBackgroundColor]=useState(generateRandomGradient())
  const [textColor, setTextColor]=useState('#FFFFFF')
  const [selectSvg,setSelectSvg]=useState(props.svgData[0].content)

  




  return (
    <div> <div
    style={{
        width: '1280px',
        height: '720px',
        display: 'flex',
        background: backgroundColor,
    }}
>

    
     <div class="text">
        <div ><div style={{height:"100px", width:"200px",marginLeft:"35%",marginBottom:"10%"}} dangerouslySetInnerHTML={{ __html: selectSvg }} /></div>
        <br />
     
     <div class="heading" style={{color:textColor}}>{props.heading}</div>
    <div class="subHeading" style={{color:textColor}} >{props.subHeading}</div>
     </div>
    

</div>
<br />
<div>
<button onClick={()=>setBackgroundColor(generateRandomGradient())}>Generate Background Color</button>


<select value={textColor} onChange={(e) => setTextColor(e.target.value)}>
  {colors.map((color, index) => (
    <option key={index} value={color.code}>{color.name}</option>
  ))}
</select>


<select value={selectSvg} onChange={(e) => setSelectSvg(e.target.value)}>
  {props.svgData?.length > 0 && props.svgData.map((svg, index) => (
    <option key={index} value={svg.content}>{svg.fileName}</option>
  ))}
</select>

</div>


</div>
  )
}

export default Preview1