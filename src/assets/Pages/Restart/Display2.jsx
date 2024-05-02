import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Sort from '../Sort';
import Sort2 from './Sort2'
import Merge2 from '../Merge2';
import Number from '../../Components/Number';
import Array from '../../Components/Array';
import Container from '../../Components/Container';
import Row from '../../Components/Row';
import Col from '../../Components/Column';
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
        for (let i = 0; i < 12; i++) {
            newArray.push(Math.floor(Math.random() * 100));
        }
        setArray(newArray);
        setArraysLoaded(true);
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
    };

    // Map array
    const map = () => {
        return array.map((el, index) => (
            <Col size="md-1" key={index}>
                <Array
                    className={`${index}full`}
                    index={index}
                    int={el}
                    time={index}
           
                />
            </Col>
        ))
    }

    // Pass to Sort
    const sort = () => {
        
        if (array) {
            return <Sort2 array={[...array] } />
        };
    };

    return (
        < div >
            {/* Show full Array */}
            <button
                onClick={makeArray}>
                Make Array
            </button>

            <Row style={{ display: 'flex', justifyContent: 'around' }}>

                {map()}
            </Row>

            {arraysLoaded && (
                sort()
            )}

        </div >
    )
}