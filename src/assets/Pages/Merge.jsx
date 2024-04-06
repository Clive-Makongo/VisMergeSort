import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
            <div>
                {props.firstHalf.map((el) => (
                    <h4>
                        {el }
                    </h4>
                ))}
            </div>
            <div>
                {props.secondHalf.map((el) => (
                    <h4>
                        {el}
                    </h4>
                ))}
            </div>
            

        </div>
    )
}