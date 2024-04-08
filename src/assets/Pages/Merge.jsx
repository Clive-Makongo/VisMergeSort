import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Row from '../Components/Row';
import Col from '../Components/Column';

export default function Merge(props) {
    const [wholeArray, setWholeArray] = useState([]);
    const [array, setArray] = useState([]);
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [arraysLoaded, setArraysLoaded] = useState(false); // State variable to track arrays loaded

    return (
        <div>
            [{props.firstHalf}],
            [{props.secondHalf}]
            <Row>
                <Col size="md-6">
                    {props.firstHalf.map((el) => (
                        <h4>
                            {el}
                        </h4>
                    ))}
                </Col>
                <Col size="md-6">
                    {props.secondHalf.map((el) => (
                        <h4>
                            {el}
                        </h4>
                    ))}
                </Col>
            </Row>


        </div>
    )
}