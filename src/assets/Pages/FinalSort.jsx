import React, { useEffect, useState } from 'react';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

const AnimateComponent = ({ arr1, arr2 }) => {
    const [firstArr, setFirst] = useState([]);
    const [secArr, setSec] = useState([]);
    const [arrsLoaded, setLoaded] = useState(false)

    useEffect(() => {
        setFirst(arr1);
        setSec(arr2);

        console.log(`First: `, firstArr);
        console.log(`Second : `, secArr);
        setLoaded(true)
    }, [arr1, arr2, arrsLoaded]);

    const startSort = (firstArr, secArr) => {
        if (Array.isArray(firstArr) && Array.isArray(secArr) && firstArr.length > 0 && secArr.length > 0) {
            console.log(`ARRAYYYYYYYYYYYYY: `, firstArr, secArr);

            return <>
                <div className='col-md-6 d-flex flex-row justify-content-between'>
                    <h5>
                        {`Array 1 First Element: ${firstArr[0][0]}`}
                    </h5>
                </div>


                <div className='col-md-6 d-flex flex-row justify-content-between'>
                    <h5>
                        {`Array 2 First Element: ${secArr[0][0]}`}
                    </h5>
                </div>
            </>
        }
    };

    return (
        <div>
            <motion.div
                style={{ border: `2px solid black`, padding: `5%` }}
                className='col-md-12 d-flex justify-content-between'>
                <h4 class="col-md-6">Array 1 First Element: </h4>

                <h4 class="col-md-6">Array 2 First Element: </h4>
            </motion.div>
            <motion.div className='col-md-12 d-flex justify-content-between' >

                {firstArr && firstArr.length > 0 && (
                    <>
                        {console.log(firstArr, `TESTTT`)}
                        <button className='col-md-6'>
                            {`${firstArr[0]}`}
                        </button>
                        {secArr && secArr.length > 0 && (
                            <>
                                {console.log(secArr, `TESTTT2`)}
                                <button className='col-md-6'>
                                    {`${secArr[0]}`}
                                </button>
                            </>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default function FinalSort(props) {
    const [array, setArray] = useState([]);

    useEffect(() => {
        console.log(props.array, ` Props ARRAY FINALLL`);
        setArray([...props.array]);
        console.log(`Array Final: `, props.array);
    }, [props.array]);

    useEffect(() => {
        console.log(`Array Final: `, array);
    }, [array]);

    return (
        <>
            <div className='row d-flex flex-row container justify-content-between'>
                <AnimateComponent arr1={array[0]} arr2={array[1]} />
            </div>
        </>
    );
}
