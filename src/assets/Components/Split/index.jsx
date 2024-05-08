import React, { useState, useEffect } from 'react';
import Array from '../../Components/Array';
import Row from '../../Components/Row';
import Col from '../../Components/Column';
import Sort2 from '../../Pages/Restart/Sort2';

export default function Split(props) {
    //Not using array???
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
            console.log(`Arrayyy ${array}`)

        };
    };

    useEffect(() => {
        splitArrays();
        console.log(`Props ${props.array}
        Array ${array}`);
    }, [props.array]);

    useEffect(() => {
        // Log array state after it's updated
        console.log('Array updated:', array);

    }, [array]);

    const sort = () => {

        if (array) {
            setArraysLoaded(true)
            return <Sort2 array={[...array]} />

        };
    };

    const setFirst = () => {
        if (firstHalf.length) {

            console.log(`firstHalf ${firstHalf}`);

            return firstHalf.map((el, index) => (
                <Col size="md-6" key={index}>
                    <Array
                        className={`${index}full`}
                        index={index}
                        int={el}
                        time={index}
                    />
                </Col>
            ));
        };
    };

    const setSecond = () => {
        if (secondHalf) {
            console.log(`firstHalf ${firstHalf}`);
            return secondHalf.map((el, index) => (
                <Col size="md-6" key={index}>
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

    const sorting = (arr) => {
        console.log(arr);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
    
                <Col size="md-6">
                <div style={{ border: '2px solid black', padding: '10px', margin: '5px', textAlign: 'center' }}>

                        <h6
                        style={{ marginBottom: '10%', padding: '10px' }}>
                            First 
                        </h6>
                    <Row style={{ display: 'flex', justifyContent: 'around', padding: '10px' }}>
                            {setFirst()}
                        </Row>

                    </div>
                </Col>
                <Col size="md-6">
                <div style={{ border: '2px solid black', padding: '10px', margin: '5px', textAlign: 'center' }}>

                        <h6
                        style={{ marginBottom: '10%', padding: '10px' }}>
                            Second
                        </h6>
                    <Row style={{ display: 'flex', justifyContent: 'around', textAlign: 'center' }}>
                            {setSecond()}
                        </Row>
                    </div>
            </Col>
            
            {sorting(firstHalf)}
            
        </div>
    );
};