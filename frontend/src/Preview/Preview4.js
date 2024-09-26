import React, {useState} from 'react'
import { colors, generateRandomGradient, getRandomColor } from '../ProcessFunction'
import './css/preview2.css'

function Preview4(props) {


    console.log(props.personImage)

  const [backgroundColor, setBackgroundColor]=useState(generateRandomGradient())
  const [textColor, setTextColor]=useState('#FFFFFF')
  const [selectSvg,setSelectSvg]=useState(props.svgData[0].content)
  const [iconBackgroundColor,setIconBackgroundColor]=useState('#000000')

  return (
    <div style={{marginTop:"10%"}}> <div
    style={{
        width: '1280px',
        height: '720px',
        display: 'flex',
        
    }}
>


     <div className='card'>
        <div class="svg-content" style={{background:iconBackgroundColor}}>
        <div style={{height:"100px", width:"200px"}} dangerouslySetInnerHTML={{ __html: selectSvg }} />
        <div class="heading1" style={{color:textColor}}>{props.heading}</div>
<div class="subHeading2" style={{color:textColor}}>{props.subHeading}</div>
        </div>
<div></div>
        
    </div>


    

</div>
<br/>
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

<button onClick={()=>setIconBackgroundColor(getRandomColor())}>Generate Icon Background </button>

</div>
</div>
  )
}

export default Preview4




