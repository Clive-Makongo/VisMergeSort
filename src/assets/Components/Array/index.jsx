import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Array(props) {
    const [array, setArray] = useState([0]);

    setArray([...props.array]);

   

    return (
        <div
            style={{ paddingRight: '15px', backgroundColor: 'white' }}
            className={props.className}>
            <div>{ setArray}</div>

            <motion.h4
                //  Delay each element's rendering
                intitial={{ y: -600, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {props.array.map((el) => (
                    <h3>{el}</h3>
                ))}
            </motion.h4>
        </div>
    )
}