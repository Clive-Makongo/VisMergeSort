import React, { useState, useEffect } from 'react';
import Array from '../../Components/Array';
import Row from '../../Components/Row';
import Col from '../../Components/Column';

export default function Sort2(props) {
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false);

    const splitArrays = () => {
        if (props.array) {
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

        };
    };

    useState(() => {
        splitArrays();

        //set loaded
        setArraysLoaded(true)
    }, []);

    const setFirst = () => {
        if (arraysLoaded) {

            console.log(`firstHalf ${firstHalf}`);
            return firstHalf.map((el, index) => (
                <Col size="md-2" key={index}>
                    <Array
                        className={`${index}full`}
                        index={index}
                        int={el}
                        time={index}
                    />
                </Col>
            ))
        }
    };

    const setSecond = () => {
        if (arraysLoaded) {
            console.log(`firstHalf ${firstHalf}`);
            return secondHalf.map((el, index) => (
                <Col size="md-2" key={index}>
                    <Array
                        className={`${index}full`}
                        index={index}
                        int={el}
                        time={index}
                    />

                </Col>
            ))
        }
    };

    const sortHalf = (arr) => {
        if (arr) {
            
        }
    }

    return (
        <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }}>
            <Col size="md-6">
                <h6>First</h6>
                <Row style={{ display: 'flex', justifyContent: 'around' }}>
                    {setFirst()}
                </Row>
            </Col>

            <Col size="md-6">
                <h6>Second</h6>
                <Row style={{ display: 'flex', justifyContent: 'around' }}>
                    {/* {setSecond()} */}
                </Row>
            </Col>
        </Row>
    );
}