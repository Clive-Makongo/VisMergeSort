import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 1, x: 0, y: -100 },
    visible: { opacity: 1, x: 0, y: 0 },
    swap: { opacity: 1, x: 0, y: 30 }
};

const Variants = () => {
    const [swap, setSwap] = useState(false);

    const handleSwap = () => setSwap(!swap);

    return (
        <>
            <button onClick={handleSwap}>Swap</button>
            <AnimatePresence>
                {swap && (
                    <motion.div
                        key="initial"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={variants}
                        transition={{ duration: 1 }}
                    >
                        <h1>Page with Variants</h1>
                        <p>Click the button to see the variants in action</p>
                    </motion.div>
                )}
                {!swap && (
                    <motion.div
                        key="swapped"
                        initial="hidden"
                        animate="swap"
                        exit="hidden"
                        variants={variants}
                        transition={{ duration: 1 }}
                    >
                        <h2>Second Variants</h2>
                        <p>Take a LOOK</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Variants;
