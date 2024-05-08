import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Row from '../Components/Row';
import Col from '../Components/Column';
import Array from '../Components/Array';
import Size from '../Components/Split';

export default function Merge(props) {
    const [number, setNumber] = useState([]);
    const [wholeArray, setWholeArray] = useState([]);
    const [arrayLoaded, setArrayLoaded] = useState(false);

    useEffect(() => {
        const numArr = [...props.firstHalf.concat(props.secondHalf)];
        
        setNumber(numArr);
        setWholeArray(props.wholeArray);
        setArrayLoaded(true);

        console.log(numArr, wholeArray);
        console.log('-------------')
    }, []);

    const addSize = () => {
        return <Size array={number}></Size>
    }

    return (
        <div>
            <Row
                style={{ display: 'flex', flexDirection: 'row' }}>
                {arrayLoaded && wholeArray.length > 1 &&
                    <Col
                        size="md-12">
                        {addSize()}
                    </Col>}
            </Row>
        </div>
    )
}