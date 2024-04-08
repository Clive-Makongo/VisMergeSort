import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Row from '../Components/Row';
import Col from '../Components/Column';

export default function Merge2(props) {
    const [wholeArray, setWholeArray] = useState([]);
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded

    const [right, setRight] = useState([]);
    const [left, setLeft] = useState([]);
    
    //useEffect to make array when Merge2 is called
    useEffect(() => {
        makeArrays()
        console.log('First Half:', firstHalf);
        console.log('Second Half:', secondHalf);
        console.log('Array:', array);
        console.log('Props Array:', props.array);
        console.log('Props Whole Array:', props.wholeArray);
        console.log('Whole Array:', wholeArray);

    }, props.array)

    //Make array of elements
    const makeArrays = () => {
        if (props.array) {
            setWholeArray(props.array);
            setArray(props.array)
            console.log(wholeArray);
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
    };


    // Split Right Array
    const splitRight = () => {
        
        if (firstHalf.length > 0 && firstHalf != null) {
            const newArray = [...firstHalf];

            const splitIndex = Math.ceil(newArray.length / 2);

            const temp1 = newArray.splice(0, splitIndex);

            setRight(temp1);
            setLeft(newArray)

            if (arraysLoaded === true) {
                console.log(firstHalf, right, left);
            }
            
            
        }
    };


    const log = () => {
        console.log(props.array)
        makeArrays()
    };

    return (
        <div>
            <button onClick={log}>LOG</button>
            <Row>
                <Col size="md-12">
                    <button onClick={splitRight}>Split Right</button>
                </Col>
            </Row>

            
        </div>
    )
}