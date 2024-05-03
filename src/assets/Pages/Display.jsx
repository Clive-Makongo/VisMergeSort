import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Sort from './Sort';
import Merge2 from './Merge2';
import Number from '../Components/Number';
import Array from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';

export default function Display() {
    //States to hold arrays for sort
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded

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

    // useEffect to set arraysLoaded when first and second halves are loaded
    useEffect(() => {
        if (firstHalf.length > 0 && secondHalf.length > 0) {
            setArraysLoaded(true);
        }
    }, [firstHalf, secondHalf]);

    //Make array of random elements
    const makeArray = () => {
        const newArray = [];
        for (let i = 0; i < 10; i++) {
            newArray.push(Math.floor(Math.random() * 100));
        }
        setArray(newArray);
    };


    //Code to split arrays
    const splitArrays = () => {
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

            // Update array directly with the modified newArray
            setArray([...array]);
        }
    }

    const render = (act) => {
        setInterval((act) => {
        
        }, 1000);
    }


    return (
        < div >
            {/* Show full Array */}
            <button
                onClick={makeArray}>
                Make Array
            </button>
            <Row style={{ display: 'flex', justifyContent: 'around' }}>

                {array.map((el, index) => (
                    <Col size="md-1">
                        <Array
                            className={`${index}full`}
                            index={index}
                            int={el}
                            time={index}
                        />
                    </Col>
                ))}

            </Row>
            {/* Show full Array */}


            {/* <Row>
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
            </Row> */}

            {/* <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}

                    {/* Show first half */}
                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        {firstHalf.length !== 0 ? (
                            firstHalf.map((el, index) => (
                                <Col
                                    size="md-2">
                                    <Array
                                        index={index}
                                        className={`${index}firstHalf`}
                                        style={{ padding: '5%' }}
                                        int={el}
                                        time={index}/>
                                </Col>
                            ))
                        ) : (
                            console.log("Empty Array")
                        )}
                    </div> */}
                    {/* Show first half */}

                    {/* Show second half */}
                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {secondHalf.length !== 0 ? (
                            secondHalf.map((el, index) => (
                                <Col size="md-2">
                                    <Array
                                        className={`${index}secHalf`}
                                        index={index}
                                        style={{ padding: '5%' }}
                                        int={el}
                                        time={index}/>
                                </Col>
                            ))
                        ) : (
                            console.log("Empty Array")
                        )}
                    </div> */}
                    {/* Show second half */}
                {/* </div>
            </Row> */}

            {/* MERGE 2 */}
            {/* {arraysLoaded && secondHalf.length > 0 && firstHalf.length > 0 &&
                <Merge2 array={[...array] } />
            } */}
            {/* MERGE 2 */}
            
            {/* Render Sort component only if arrays are loaded 
            MERGE 1*/}
            {/* {arraysLoaded && secondHalf.length > 0 && firstHalf.length > 0 &&
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
                </Row>} */}

        </div >
    )
}