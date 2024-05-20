import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Array from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';

export default function Sort(props) {
    const [elementHtml, setElementHtml] = useState(null); // State to store the HTML content
    const elementRef = useRef(null); // Ref to store the element reference
  

    useEffect(() => {
        // Get the element by ID after the component mounts
        // This is the first element of the last row in the table
        const el = document.getElementById("id_6-child-row-0");
        if (el) {
            setElementHtml(el.innerHTML); // Set the HTML content to state
            //console.log(`Element HTML: `, el);
            
        }
    }, [props]);

    const target = (e) => { 
        console.log(`Target: `, e.target);
    }

    return (
        <>
            <div ref={elementRef}>
                {elementHtml ? (
                    
                <div 
                dangerouslySetInnerHTML={{ __html: elementHtml }}
                    onClick={target}
                />
                     
                ) : (
                    <p>Loading...</p>
                )}
            </div>
           
        </>
    );
}
