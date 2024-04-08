import React, { useState, useEffect } from 'react';
import Array from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';
import Merge from './Merge';

export default function Sort(props) {
    const [wholeArray, setWholeArray] = useState([]);
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded

    // useEffect to set arraysLoaded when first and second halves are loaded
    // useEffect to log arrays when arraysLoaded is true
    useEffect(() => {
        if (arraysLoaded) {
            console.log('First Half:', firstHalf);
            console.log('Second Half:', secondHalf);
            console.log('Array:', array);
            console.log('Props Array:', props.array);
            console.log('Props Whole Array:', props.wholeArray);
            console.log('Whole Array:', wholeArray);
        }
    }, [arraysLoaded, firstHalf, secondHalf, array, wholeArray]);


    //Make array of elements
    const makeArrays = () => {
        if (props.array) {
            setWholeArray(props.wholeArray)
            console.log(wholeArray)
        }

        if (props.array.length > 0) {
            const newArray = [...props.array]; // Create a copy of the array            

            // Calculate the index to split the array into two halves
            const splitIndex = Math.ceil(newArray.length / 2);

            // Use splice to get the first half of the array
            const temp1 = newArray.splice(0, splitIndex);

            // Update the state with the first half of the array
            setFirstHalf(temp1);

            // Update the state with the second half of the array (remaining elements in newArray)
            setSecondHalf(newArray);

            // Update array directly with the modified newArray
            setArray([...props.array]);
        }

        // Update arraysLoaded state after state updates are applied
        setArraysLoaded(true);
    };

    return (
        <div>

            {/* Sort*/}
            <Row>
                <Col size="md-12">
                    <button
                        onClick={makeArrays}>
                        Split
                    </button>
                </Col>

            </Row>
            <Row style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>

                    {/* Show first half */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} >
                        {firstHalf.length !== 0 ? (
                            firstHalf.map((el, index) => (
                                <motion.div>
                                    <Col
                                        key={index}
                                        size="md-2">
                                        <Array
                                            className={'firstHalf ' + index}
                                            style={{ padding: '2%' }}
                                            int={el} />
                                    </Col>
                                </motion.div>
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
                                <Col key={index} size="md-2">
                                    <Array
                                        style={{ padding: '2%' }}
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
            {arraysLoaded && secondHalf.length > 1 && firstHalf.length > 1 &&
                <Row>
                    <Col size="md-6">
                        <Sort
                        array={[...firstHalf]}
                        wholeArray={[...wholeArray]}
                    />
                    </Col>
                    
                    <Col size="md-6">
                        <Sort
                        array={[...secondHalf]}
                        wholeArray={[...wholeArray]}
                    />
                    </Col>
                </Row>
            }

            {arraysLoaded && secondHalf.length <= 2 && firstHalf.length <= 2 &&
                <Merge
                firstHalf={[...firstHalf]}
                secondHalf={[...secondHalf]} />
                
            }
        </div>
    )
}