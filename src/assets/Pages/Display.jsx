import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Array from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';

import cut from '../Components/Cut';
import cutGPT from '../Components/CutGPT';
import { motion } from 'framer-motion';


export default function Display() {
    //States to hold arrays for sort
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded
    const [key, setKey] = useState(0); // State variable to trigger re-render and animation

    // Vaariants to delay animation
    const variants = {
        hidden: {
            y: -300,
            opacity: 0,
        },
        visible: {
            y: -10,
            opacity: 1,
            duration: 1,
            transition: {
                delayChildren: 0.5
            }
        }
    };

    const item = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1
        }
    };

    // UseEffect to make arrays
    useEffect(() => {
        makeArray();
        setKey(prevKey => prevKey + 1);
        console.log(`Arrays loaded: ${arraysLoaded}`)
        
    }, []);

    // useEffect to set arraysLoaded when first and second halves are loaded
    useEffect(() => {
        console.log(`First half: ${firstHalf.length}, Second half: ${secondHalf.length}, Full array: ${array.length}, 
        First half: ${firstHalf}, 
        Second half: ${secondHalf}, 
        Full array: ${array}`);

        console.log(`Arrays loaded: ${arraysLoaded}`)

        if (firstHalf.length && secondHalf.length && array.length) {
            setArraysLoaded(true);
        }
    }, [firstHalf, secondHalf, array]);



    //Make array of random elements
    const makeArray = () => {
        const newArray = [];
        for (let i = 0; i < 12; i++) {
            newArray.push(Math.floor(Math.random() * 100));
        }
        setArray(newArray);
        splitArrays(newArray);
        console.log(array, arraysLoaded);
        console.log(`CutGPT: ${cutGPT(newArray)}`)
        
    };


    //Code to split arrays
    const splitArrays = (array) => {
        if (array) {
            const newArray = [...array]; // Create a copy of the array            

            // Calculate the index to split the array into two halves
            const splitIndex = Math.ceil(newArray.length / 2);

            // Use splice to get the first half of the array
            const temp1 = newArray.splice(0, splitIndex);

            // Update the state with the first half of the array
            setFirstHalf(temp1);

            // Update the state with the second half of the array (remaining elements in newArray)
            setSecondHalf(newArray);

        };
    };

    // Map array
    const map = () => {
        return (
            <>
                <h6>Array</h6>
                <Col style={{ border: '2px solid black', padding: '10px', margin: '5px' }} size="md-12">
                    <Array array={[...array]} />
                </Col>

            </>
        );
    };



    return (
        <>
            {/* Show full Array */}
            <button
                onClick={makeArray}>
                Make New Array
            </button>

            <Row>
                {
                    cut(array)
                }
              
            </Row>









        </>
    )
}