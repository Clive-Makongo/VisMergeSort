import React, { useRef, useEffect, useState } from 'react';
import { AnimatePresence, delay, motion } from 'framer-motion';
import { Link, Route, Routes } from 'react-router-dom';

const loadVariants = (variants) => {
    let varState = []

    const { start, swap } = variants;

    console.log(`Start: `, start);
    console.log(`End: `, swap);

    varState = [start, swap];

    return varState;
};

export default function Variants() {
    const [varState, setVarState] = useState([]);
    const [varLoaded, setVarLoaded] = useState(false);
    const ref = useRef(null);
    const ref2 = useRef(null);

    useEffect(() => {
        if (varState != true) {

            const loaded = loadVariants(variants2);
            console.log(loaded);

            setVarState([{ loaded: loaded }]);
            console.log(`Var State: `, varState);

            setVarLoaded(true)
        }

    }, []);

    const variants = {
        hidden:
            { opacity: 0, x: -100, y: -100 }, transition: { delay: 5000 },
        visible:
            { opacity: 1, x: 0, y: 100 }, transition: { delay: 5000 }
    };

    const variants2 = {
        start: {
            opacity: 1, x: 0, y: 0
        }, swap: {
            opacity: 1, x: 0, y: -100
        }
    };

    console.log(`Var State: `, varState);

    return (
        <>
            <motion.div
                ref={ref}
                initial="hidden"
                animate="visible"
                variants={variants}
            >
                <h1>Page with Variants</h1>
                <p>Click the link below to see the variants in action</p>

            </motion.div>
            <motion.div
                ref={ref2}
                initial="start"
                animate="swap"
                variants={variants2}
            >
                <h2>Second Variants</h2>
                <p>Take a LOOK</p>

            </motion.div>
        </>
    );
};