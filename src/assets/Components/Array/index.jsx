import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Array(props) {

    return (
        <div
            style={{ paddingRight: '15px', backgroundColor: 'green' }}
            className={props.className}>

            <motion.h4
                //  Delay each element's rendering
                intitial={{ y: -600, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                [{`${props.int}`}],
            </motion.h4>
        </div>
    )
}