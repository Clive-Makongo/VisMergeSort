import React, { useRef, useEffect, useState } from 'react';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

export default function FinalSort(props) {
    const [array, setArray] = useState([]);

    useEffect(() => {
        console.log(props.array, ` Props ARRAY FINALLL`);
        setArray([...props.array]);

        console.log(`Array Final: `, props.array);

    }, []);

    useEffect(() => {
        console.log(`Array Final: `, array);
    }, [array])



    return (
        <>
            {
                array.length === 3 &&
                (array.map((el, index) => {
                    return (<>
                        <h5>
                            {el} 
                            {console.log(array.length, ` Arr Length`)}
                        </h5>
                        <p>
                            {console.log(`El ${index} :`, el)}
                        </p>
                        <p>
                            {el[0]}, 
                            
                        </p>
                    </>)
                }))
            }

        </>
    )
}