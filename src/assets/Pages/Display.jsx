import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
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
    }, []);

    // useEffect to set arraysLoaded when first and second halves are loaded
    useEffect(() => {
        console.log(`First half: ${firstHalf.length}, Second half: ${secondHalf.length}, Full array: ${array.length}, 
        First half: ${firstHalf}, 
        Second half: ${secondHalf}, 
        Full array: ${array}`);

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

//MY CUT FUNCTION. FIX THIS WITH HELPER FUNCTION
    const cut = (arr) => {
  
        // Set the amount of columns to display
        let amount = ``;

        // Set the amount of columns to display if Array is 12 or more
        if (arr.length >= 12 && array) {
            amount = 'md-6';
            console.log(`Amount: ${amount}`);

            const splitIndex = Math.ceil(array.length / 2);
            const arr1 = array.slice(0, splitIndex);
            const arr2 = array.slice(splitIndex, arr.length);

            console.log(`First Half: ${arr1}, Second Half: ${arr2}`);
            return (
                <>
                    <h1>TWO</h1>
                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr1]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr2]} />
                    </Col>
                </>
            )

            // Set the amount of columns to display if Array is 6 or more
        } else if (arr.length >= 6 && firstHalf && secondHalf) {
            amount = 'md-2';
            console.log(`Amount: ${amount}`);

            //Split First in to 3 arrays
            const splitIndex = Math.ceil(firstHalf.length / 3);
            const arr1 = firstHalf.slice(0, splitIndex);
            const arr2 = firstHalf.slice(splitIndex, splitIndex * 2);
            const arr3 = firstHalf.slice(splitIndex * 2, arr.length);

            //Split Second in to 3 arrays
            const splitIndex2 = Math.ceil(secondHalf.length / 3);
            const arr4 = secondHalf.slice(0, splitIndex2);
            const arr5 = secondHalf.slice(splitIndex2, splitIndex2 * 2);
            const arr6 = secondHalf.slice(splitIndex2 * 2, arr.length);

            return (
                <Row id={key}>
                    <h1>Four</h1>
                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr1]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr2]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr3]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr4]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr5]} />
                    </Col>

                    <Col style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size={amount}>
                        <Array array={[...arr6]} />
                    </Col>
                </Row>
            )


        } else if (arr.length <= 3) {
            amount = 'md-2';
            console.log(`Amount: ${amount}`);
         }


        

       
    };

    // Chat GPT cut function
    const cutGPT = (arr) => {
        // Set the amount of columns to display
        let amount = 'md-2';

        if (arr.length >= 12) {
            amount = 'md-6';
            const splitIndex = Math.ceil(arr.length / 2);
            const arr1 = arr.slice(0, splitIndex);
            const arr2 = arr.slice(splitIndex);
            return renderArrays([arr1, arr2]);
        } else if (arr.length >= 6) {
            amount = 'md-2';
            const splitArr = splitArray(arr, 3);
            return renderArrays(splitArr);
        }

        // If the array length is less than or equal to 3, render the array directly
        return renderArrays([arr]);
    };

    // Helper function to split array into multiple arrays
    const splitArray = (arr, numChunks) => {
        const chunkSize = Math.ceil(arr.length / numChunks);
        const result = [];
        for (let i = 0; i < numChunks; i++) {
            result.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
        }
        return result;
    };

    // Helper function to render arrays
    const renderArrays = (arrays) => {
        return arrays.map((subArray, index) => (
            <Col key={index} style={{ border: '2px solid black', padding: '10px', margin: '0px' }} size="md-2">
                <Array array={[...subArray]} />
            </Col>
        ));
    };

    return (
        <>
            {/* Show full Array */}
            <button
                onClick={makeArray}>
                Make New Array
            </button>

            <Row style={{ display: 'flex', justifyContent: 'around' }}>
                {map()}
            </Row>  
            <Row>

            
                {arraysLoaded && (
                    cutGPT(array)
                   
                )}
            </Row>             
            <Row>
                {arraysLoaded && (
                    cutGPT(firstHalf),
                    cutGPT(firstHalf)

                )}
            </Row>
            <button>
                Sort                                                  
            </button>


            

            

        </>
    )
}