import React, { useState, useEffect } from 'react';
import Array from '../../Components/Array';
import Row from '../../Components/Row';
import Col from '../../Components/Column';
import Split from '../../Components/Split';

export default function Sort2(props) {
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false);

    const splitArrays = () => {
        if (props.array) {
            const newArray = [...props.array];

            const splitIndex = Math.ceil(newArray.length / 2);

            const temp1 = newArray.splice(0, splitIndex);

            setFirstHalf(temp1);
            setSecondHalf(newArray);
            setArray([...props.array]);
        };
    };

    useEffect(() => {
        splitArrays();
    }, [props.array]);

    useEffect(() => {
        console.log('Array updated:', array);
    }, [array]);

    const setFirst = () => {
        if (firstHalf.length) {
            return firstHalf.map((el, index) => (
                <Col size="md-2" key={index}>
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

    const split = (arr) => {
        if (arr) {
            return (
                <Split array={arr} />
            );
        };
    };

    const cut = (arr) => {
        const newArray = [...arr];

        const splitIndex = Math.ceil(newArray.length / 2);

        const temp1 = newArray.splice(0, splitIndex);

        return (
            <>
                <Col size="md-6">
                    {split(temp1)}
                </Col>
                <Col size="md-6">
                    {split(newArray)}
                </Col>
            </>
        );
    };

    return (
        <div>
            <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }}>
                <Col size="md-6">
                    <div style={{ border: '2px solid black', padding: '10px', margin: '5px' }}>
                        <h6 style={{ marginBottom: '10%' }}>First Half</h6>
                        <Row style={{ display: 'flex', justifyContent: 'around' }}>
                            {setFirst()}
                        </Row>
                    </div>
                </Col>
                <Col size="md-6">
                    <div style={{ border: '2px solid black', padding: '10px', margin: '5px' }}>
                        <h6 style={{ marginBottom: '10%' }}>Second Half</h6>
                        <Row style={{ display: 'flex', justifyContent: 'around' }}>
                            {setSecond()}
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col size="md-6">
                    {cut(firstHalf)}
                </Col>
                <Col size="md-6">
                    {cut(secondHalf)}
                </Col>
            </Row>
    
        </div>
    );
}
