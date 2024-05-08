import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Col from '../Column';

export default function Array(props) {
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        // Reset the mounted state to false whenever props.int changes
        setMounted(false);

        setTimeout(() => setMounted(true), props.time * 100);

    }, [props.int]);


    return (
        mounted && (
            <motion.div
                //  Delay each element's rendering
                intitial={{ y: -600, opacity: 0, }}
                animate={{ y: -10, opacity: 1 }}

                // St
                style={{
                    padding: '15%', backgroundColor: 'gray', borderRadius: '15%', textAlign: 'center', width: '2rem', height: '2rem', margin: '30%',
                }}
                className={props.className}>

                <motion.h4>
                    {`${props.int}`}
                </motion.h4>
            </motion.div>)
    )
};

