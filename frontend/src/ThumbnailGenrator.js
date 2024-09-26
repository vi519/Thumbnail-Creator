

import React, { useState } from "react";
import './thumbnail.css'
import Preview1 from "./Preview/Preview1";
import Preview2 from "./Preview/Preview2";
import Preview3 from "./Preview/Preview3";
import Preview4 from "./Preview/Preview4";

function ThumbnailGenrator(props) {
   
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

   
    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        
                        <Preview1 svgData={props.svgData} heading={props.heading} subHeading={props.subHeading} gradient={props.gradient} personImage={props.personImage} />
                        <Preview2 svgData={props.svgData} heading={props.heading} subHeading={props.subHeading} gradient={props.gradient} personImage={props.personImage} />
                        <Preview3 svgData={props.svgData} heading={props.heading} subHeading={props.subHeading} gradient={props.gradient} personImage={props.personImage}  backgroundImage={props.backgroundImage}/>
                        <Preview4 svgData={props.svgData} heading={props.heading} subHeading={props.subHeading} gradient={props.gradient} personImage={props.personImage}  />

                       
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThumbnailGenrator;
