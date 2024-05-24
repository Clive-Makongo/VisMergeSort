import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Arrays from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

const NextSortPage = (props) => {
    const [grandChildren, setGrandChildren] = useState([]);
    const [paired, setPaired] = useState([]);
    const [pairedLoaded, setPairedLoaded] = useState(false);

    console.log(props, ` :NextSortPage`);

    useEffect(() => {
        setGrandChildren(props.grandChildren);

        let arr = [];
        for (let i = 0; i < grandChildren.length; i++) {
            arr[i] = [grandChildren[i].firstChild, grandChildren[i].secondChild];
        };

        let arr2 = [];
        let temp = [];
        arr.forEach((el, index) => {
            temp.push(el);
            if ((index + 1) % 2 === 0) {
                arr2.push(temp);
                temp = [];
            }
        });

        // Push the remaining elements if any
        if (temp.length > 0) {
            arr2.push(temp);
        }
        console.log(`Arr2: `, arr2);

        setPaired([...arr2]);
        setPairedLoaded(true);
    }, [props]);

    useEffect(() => {
        console.log(`Paired: `, paired);
        console.log(`Paired Loaded: `, pairedLoaded);
    }, [paired, pairedLoaded]);

    const sort = (index) => {
        const element = paired[index];
        console.log(`Element: `, element);
        console.log(`Index: `, index);
    };

    return (
        <>
            <h4
                style={{ marginTop: '1rem' }}
            >
                Click Element to Sort
            </h4>
            <>
                <div className='row d-flex flex-row'>
                    <div className='col-md-12 d-flex flex-row align-items-center'>
                        <Container>
                            <Row>
                                <Col size="md-12">
                                    {pairedLoaded && paired.map((el, index) => {
                                        return (
                                            <button
                                                onClick={() => { sort(index) }}
                                                key={index}
                                                style={{ border: '2px solid black', margin: '1rem', padding: "1rem" }}
                                                className='d-flex flex-row col-md-4 align-items-center justify-content-center'>
                                                <div
                                                    style={{ backgroundColor: 'gray', borderRadius: '5px', padding: '0.5rem', margin: '0.5rem' }}
                                                    className='mapped-pair d-flex flex-row align-items-center justify-content-center col-md-6'
                                                    id={`pair-${index}-0`}

                                                >
                                                    <motion.p>
                                                        {el[0][0]},
                                                    </motion.p>
                                                    <motion.p>
                                                        {el[0][1]}
                                                    </motion.p>

                                                </div>
                                                <div
                                                    style={{ backgroundColor: 'gray', borderRadius: '5px', padding: '0.5rem', margin: '0.5rem' }}
                                                    className='mapped-pair d-flex flex-row align-items-center justify-content-center col-md-6'
                                                    id={`pair-${index}-1`}
                                                >
                                                    <motion.p>
                                                        {el[1][0]},
                                                    </motion.p>
                                                    <motion.p>
                                                        {el[1][1]}
                                                    </motion.p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        </>
    );
};

export default NextSortPage;