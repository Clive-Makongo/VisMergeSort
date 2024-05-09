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
            <Row style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                {array.map((el, index) => (
                    <Col size="md-1">
                        <Array
                            className={`${index}full`}
                            index={index}
                            int={el}
                        />
                    </Col>
                ))}

            </Row>
            {/* Show full Array */}


            <Row>
                <div
                    style={{
                        display: 'flex', justifyContent: 'center'
                    }}
                >
                    <Col size="md-6">
                    <button
                    onClick={splitArrays}>
                    Split
                </button>
                </Col>
                </div>
            </Row>

            <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {/* Show first half */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        {firstHalf.length !== 0 ? (
                            firstHalf.map((el, index) => (
                                <Col
                                    size="md-2">
                                    <Array
                                        index={index}
                                        className={`${index}firstHalf`}
                                        style={{ padding: '5%' }}
                                        int={el} />
                                </Col>
                            ))
                        ) : (
                            console.log("Empty Array")
                        )}
                    </div>
                    {/* Show first half */}

                    {/* Show second half */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {secondHalf.length !== 0 ? (
                            secondHalf.map((el, index) => (
                                <Col size="md-2">
                                    <Array
                                        className={`${index}secHalf`}
                                        index={index}
                                        style={{ padding: '5%' }}
                                        int={el} />
                                </Col>
                            ))
                        ) : (
                            console.log("Empty Array")
                        )}
                    </div>
                    {/* Show second half */}
                </div>
            </Row>

            {/* Render Sort component only if arrays are loaded */}
            {arraysLoaded && secondHalf.length > 0 && firstHalf.length > 0 &&
                <Row>
                    <Col size="md-6">
                        <Sort
                            array={[...firstHalf]}
                            wholeArray={[...array]}
                        />
                    </Col>

                    <Col size="md-6">
                        <Sort
                            array={[...secondHalf]}
                            wholeArray={[...array]}
                        />
                    </Col>
                </Row>}

        </>
    )
}