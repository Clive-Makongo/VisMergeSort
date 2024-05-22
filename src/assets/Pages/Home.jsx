import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Sort from './Sort';
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
    const [colObj, setColObj] = useState({}); // State variable to hold colArray object
    const [colObjLoaded, setColObjLoaded] = useState(false); // State variable to track colObj loaded
    const [visibility, setVisibility] = useState("visible"); // State variable to track visibility of array
    const [split, setSplit] =
        useState(false); // State variable to track split

    // UseEffect to make arrays
    useEffect(() => {

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
            //console.log(colArray);
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



    //UseEffect to track colArray and colObj
    useEffect(() => {
        //console.log(`colArray: `, colArray, `colObj: `, colObj);

        if (colArray.length > 0) {
            //console.log(`colArray: ${colArray}, colObj: ${colObj}`);

            setColArrayLoaded(true);
            setColObjLoaded(true);
        }

    }, [colArray, colObj]);

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
            let arr = [];
            let obj = {}; // Object to hold results
            do {
                let res = [];
                res.push(renderArray(array, i));
                arr.push(res);
                //console.log(res, `i: ${i}`);
                obj[`id_${i}`] = res; // Assign res to object with an ID
                //console.log(obj);
                i++;
            } while (i < 7);

            // UGLY USESTATE WORKAROUND
            colArray[0] = arr;
            setColObj(obj);


            //setColArray(obj);

        } else {
            console.log(`array is empty`);
        }
    };

    const displayArray = (i, id) => {
        return colArrayLoaded && colObjLoaded && (
            colObj[i][0].map((el, index) => {
                return (
                    <Col name={`${id}`} id={`${id}-child-row-${index}`} style={{ border: "2px, solid, black", display: "flex", flexDirection: "row" }} size={`md-${el[0].length}`} key={`${id}-array-row-${index}`}>
                        <Array
                            // Hash is a unique identifier for each element
                            hash={`${i}-${index}`}
                            array={[...el[0]]}
                            id={id}

                        />
                    </Col>
                )
            })
        );
    };

    const handleSplit = () => {
        setSplit(true);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col size='md-12' id="make-btn">
                        {/* Show full Array */}
                        <button
                            onClick={makeArray}>
                            Make New Array
                        </button>
                    </Col>

                    <Col style={{ visibility: `${visibility}` }} size="md-12" id="first-array"
                        name={`id-1`}>
                        {arraysLoaded && (
                            displayArray('id_1', 'id_1')
                        )}
                    </Col>

                    {arraysLoaded && (<button onClick={handleSplit}>SPLIT </button>)}

                    {split && (
                        displayArray('id_2', 'id_2')
                    )}

                    {split && (
                        displayArray('id_4', 'id_4')
                    )}

                    {split && (
                        displayArray('id_6', 'id_6')
                    )}

                    {split && (
                        <Col size="md-12">
                            <Sort array={colArray[0][0]} />
                        </Col>
                    )}


                </Row>
            </Container>
        </>
    )
}