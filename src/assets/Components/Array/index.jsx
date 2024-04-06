import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Array(props) {
    const [count, setCount] = useState([0]);

    const keepTrack = () => {
        setCount(() => {
            count.push(4)
        });
    }

    return (
        <div
            style={{ paddingRight: '15px', backgroundColor: 'green' }}
            className={props.className}>
            <div>{keepTrack }</div>

            <motion.h4
                //  Delay each element's rendering
                intitial={{ y: -600, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                [{`${props.int} ${count}`}],
            </motion.h4>
        </div>
    )
}