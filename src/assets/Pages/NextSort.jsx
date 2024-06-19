import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import FinalSort from './FinalSort';
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
    const [swap, setSwapped] = useState([]);
    const [finalSorted, setFinalSorted] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

   //console.log(props, ` :NextSortPage`);

    useEffect(() => {
        setGrandChildren(props.grandChildren);
        setFinalSorted([]);

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
        //console.log(`Paired: `, paired);
        // console.log(`Paired Loaded: `, pairedLoaded);
        console.log(`Final Sorted: `, finalSorted);

        if (finalSorted.length === 3) {
            console.log(`Final Sorted Array is Full`)
        }
    }, [paired, pairedLoaded, finalSorted]);

    const sort = (index) => {
        const element = paired[index];
        let temp = [];
        let i = 0, j = 0, k = 0;

        // Make sure element[0] and element[1] are arrays and have elements
        if (Array.isArray(element[0]) && Array.isArray(element[1]) && element[0].length > 0 && element[1].length > 0) {
            while (element[0].length > 0 && element[1].length > 0) {
                if (parseInt(element[0][0]) < parseInt(element[1][0])) {
                    console.log(element[0][0], ` Element 0-${i} is smaller than Element 1-${j} ${element[1][0]}`);
                    temp[k++] = element[0].shift(); // Remove from element[0] and add to temp
                    console.log(temp, `  Temp el[0] is Smaller. ${i} I. ${k} K`);
                } else {
                    console.log(element[0][0], ` Element 0-${i} is greater than Element 1-${j} ${element[1][0]}`);
                    temp[k++] = element[1].shift(); // Remove from element[1] and add to temp
                    console.log(temp, `  Temp el[1] is Smaller.  ${j} J. ${k} K`);
                }
            }

            // Add remaining elements from element[0] to temp if any
            while (element[0].length > 0) {
                temp[k++] = element[0].shift();
                console.log(`Temp: `, temp);
            }

            // Add remaining elements from element[1] to temp if any
            while (element[1].length > 0) {
                temp[k++] = element[1].shift();
                console.log(`Temp: `, temp);
            }

            setFinalSorted((prevFinalSorted) => {
                const newFinalSorted = [...prevFinalSorted];
                newFinalSorted[index] = temp;
                return newFinalSorted;
            });

            console.log(`Final Sorted: `, finalSorted);

            // Update the paired array with the sorted elements
            paired[index] = [temp.slice(0, Math.ceil(temp.length / 2)), temp.slice(Math.ceil(temp.length / 2))];
            setPaired([...paired]);
            
            console.log(paired, ` Final Array`)
            setSwapped({ index, swapped: true });
        } else {
            console.log('One of the elements arrays is empty or not an array.');
        }
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

                                {finalSorted.length === 3 &&
                                    
                                    <Col size="md-12">
                                        <FinalSort array={finalSorted} />
                                    </Col>
                                }
                            </Row>
                        </Container>
                    </div>
                </div>
            </>

            {/* Modal Implementation */}
            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent && (
                        <p>{modalContent}</p>

                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NextSortPage;