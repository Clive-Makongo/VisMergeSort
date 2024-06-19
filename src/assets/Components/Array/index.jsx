import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Row from '../Row';
import Col from '../Column';

export default function Array(props) {
    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [key, setKey] = useState(0);
    const [size, setSize] = useState(0);


    // UseEffect to set mounted and array
    useEffect(() => {
        setMounted(true);
        setArray(props.array);
        colSize(); 

    }, [props.array]);


    // Function to set column size based on array length
    const colSize = () => {
        let x = 1;
        //console.log(`Array length: ${array.length}`, array.length);
        if (!props.array.length) x = 1;
        else x = 12 / props.array.length;
        setSize(x);
        //console.log(`size: ${size}`);
        //console.log(`x: `, x);
    };

    useEffect(() => {
        // Update the key whenever props.array changes to trigger re-render and animation
        setKey(prevKey => prevKey + 1)
        console.log(`key: ${key}`)
    }, [props.array]);

    const loadArray = () => {
        return array && mounted && (
            array.map((el, index) => {
                // Generate a unique ID by combining index with a prefix
                const uniqueId = `element-${index}`;
                return (
                    <Col name={`${props.hash}`} size={`md-${size}`} key={index} id={`size-${array.length}-${uniqueId}-${props.hash} ${props.id}-col-${index} ${uniqueId} `}>
                        <motion.div
                            key={key}
                            className={`${props.id}-${size}`} id={`${uniqueId} ${props.id}-element-${index}`}
                            initial={{ y: -600, opacity: 0 }}
                            animate={{ y: -10, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            style={{ backgroundColor: 'gray', borderRadius: '15%', textAlign: 'center', width: '2rem', height: '2rem', margin: '30%' }}
                            key={`${props.id}-col-${index}`}
                        >
                            <motion.h4
                                key={key}>
                                {el}
                            </motion.h4>
                        </motion.div>
                    </Col>
                );
            })
        );
    };


    const map = () => {
            return <>
                {loadArray()}
            </>
    };



    const sort = () => {
        if (array.length === 2) {
            // Sort elements
            const arr = [...array]
            if (arr[0] > arr[1]) {
                const temp = arr[0];
                arr[0] = arr[1];
                arr[1] = temp;
                setArray(arr)
            } else {
                console.log('Array is already sorted');
            };

            return (
                <>
                    {loadArray()}
                </>
            )
        }
    }


    return (
        array && mounted && (
            <>
                {map()}
            </>
        )
    
    )
};

