import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Array from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';

export default function Home() {
    const [array, setArray] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded
    const [wholeArrayKey, setKey] = useState(0); // State variable to trigger re-render and animation
    const [cutArrayKey, setCutArrayKey] = useState(0); // State variable to trigger re-render and animation
    const [colArray, setColArray] = useState([]); // State variable to hold array of arrays
    const [colArrayLoaded, setColArrayLoaded] = useState(false); // State variable to track colArray loaded

    // UseEffect to make arrays
    useEffect(() => {
        makeArray();
        pushAllCuts(array);

    }, []);

    //UseEffect to push all cuts to colArray
    useEffect(() => {
        pushAllCuts(array);
        setColArrayLoaded(true);
    }, [wholeArrayKey]);

    // useEffect to set arraysLoaded when first and second halves are loaded
    useEffect(() => {
        //console.log(`Full array: ${array.length}, Full array: ${array}`);

        if (array.length) {

            setKey(prevKey => prevKey + 1);
            console.log(colArray); 
        }
    }, [array]);

    //Make array of random elements
    const makeArray = () => {
        setArraysLoaded(false);
        const newArray = [];
        for (let i = 0; i < 12; i++) {
            newArray.push(Math.floor(Math.random() * 100));
        }
        setArray(newArray);
        setArraysLoaded(true);
        pushAllCuts(newArray);

    };

    // Function to render the array based on chunk size
    const renderArray = (arr, numChunks) => {
        const chunkSize = Math.ceil(arr.length / numChunks);
        const result = [];
        for (let i = 0; i < numChunks; i++) {
            const chunk = [arr.slice(i * chunkSize, (i + 1) * chunkSize)];
            result.push(chunk);
        };
        return result;
    };

    // Function to push all cuts to colArray
    const pushAllCuts = (array) => {
        if (array.length > 0 && arraysLoaded) {
            let i = 1;
            let res = [];
            do {
                res.push(renderArray(array, i))

                i++;
            } while (i <= 6);

            // UGLY USESTATE WORKAROUND
            colArray[0] = res;
            //setColArray(res);

        } else {
            console.log(`array is empty`);
        };
    };

    return (
        <>
            <Container>
                <Row>
                    <Col size='md-12'>
                        {/* Show full Array */}
                        <button
                            onClick={makeArray}>
                            Make New Array
                        </button>
                    </Col>

                    {arraysLoaded && (
                        <Col id={`id-${wholeArrayKey} array-${array.length} id-${wholeArrayKey}-l-${array.length}`} size='md-12'
                        >
                            <Array array={array} />
                        </Col>

                    )}

                    {colArrayLoaded &&(<Col size='md-12'>
                        {colArray.map((el, index) => (
                            <Col size='md-2' key={index}>
                                <Array array={el[0]} />
                            </Col>
                        ))}
                    </Col>)}


                </Row>
            </Container>
        </>
    )
}