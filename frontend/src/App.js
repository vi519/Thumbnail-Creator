import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './index.css'
import ThumbnailGenrator from './ThumbnailGenrator';

function App() {
  const [heading, setHeading]   = useState("")
  const [subHeading, setSubHeading] = useState("")
  const [svgData, setSvgData] = useState(null);
  const [selectSvg, setSelectSvg] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [personImage, setPersonImage] = useState(null)
  const [gradient, setGradient] = useState('');
  const [showTemplate, setShowTemplate] = useState('')




  const generateRandomGradient = () => {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    const angle = Math.floor(Math.random() * 360);
    const gradientString = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    setGradient(gradientString);
  };

  function handleImageChange(e, index) {
    
    

    if (index === 1) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setBackgroundImage(reader.result);
      };
  
      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }
     
    }
    else {
      const imageFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPersonImage(reader.result);
      };
  
      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }
      setPersonImage(imageFile);
    }

  };

  function handleUpload(index) {

    if (index === 1) {
      if (backgroundImage) {
        console.log("Uploading image:", backgroundImage);
        const formData = new FormData();
        formData.append('image', backgroundImage);

      } else {
        console.log("No image selected.");
      }
    }

    else {
      if (personImage) {
        console.log("Uploading image:", personImage);
        const formData = new FormData();
        formData.append('image', personImage);

      } else {
        console.log("No image selected.");
      }

    }


  };

  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    function capitalize(s) {
      return s[0].toUpperCase() + s.slice(1);
    }



    const listData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/data`);

        const formattedOptions = response.data.map(option => ({
          value: option.id,
          label: capitalize(option.name)
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    listData();


  }, []);

  async function fetchData() {


    try {
      const response = await axios.get(`http://localhost:8081/api/search-svg?folderName=${selectedOption.value}`);
      setSvgData(response.data);

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => { if (selectedOption !== null) fetchData() }, [selectedOption])

  return (

    <div className="App">
      <h1>Make Your Thumbnail in 30 seconds</h1>
      <label htmlFor="mainHeading">Heading:
        <input id="mainHeading" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />  </label>


      <label htmlFor="subHeading">SubHeading:
        <input id="subHeading" type="text" value={subHeading} onChange={(e) => setSubHeading(e.target.value)} /> </label>
      <div style={{ color: "black", width: "20%", margin: "auto" }}>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      {selectedOption !== null ? <div class="grid-container" style={{ color: "black", width: "70%", margin: "auto" }} >
        {svgData?.length && svgData.map((svg, index) => (
          <div key={index}>


            <div style={{ padding: "10%", margin: "auto", height: "200px" }} dangerouslySetInnerHTML={{ __html: svg.content }} />
            <h3 style={{ width: "70%", color: "white" }} >{svg.fileName?.replace(".svg", "")}</h3>


          </div>
        ))}
      </div> : null}

      <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 1)} />
      <button onClick={() => handleUpload(1)}>Upload Image</button>

    

    

      <div
        style={{
          width: '25vw',
          height: '25vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
        }}
      >

      </div>

      <div>
        User Image: <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 2)} />
        <button onClick={() => handleUpload(2)}>Upload Image</button>
        

      </div>

      <br />
      <ThumbnailGenrator svgData={svgData} heading={heading} subHeading={subHeading} gradient={gradient} personImage={personImage} backgroundImage={backgroundImage} />

    </div>
  );
}

export default App;
