import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const useElementsHtml = (array) => {
    const [elementsHtml, setElementsHtml] = useState([]);
    const elementRef = useRef([]);

    useEffect(() => {
        const elements = document.querySelectorAll('[id^="id_6-child-row-"]');
        const htmlArray = Array.from(elements, el => el.innerHTML);
        setElementsHtml(htmlArray);
        elementRef.current = Array.from(elements);
    }, [array]);

    return { elementsHtml, elementRef };
};

const useSort = (elementRef) => {
    const [grandChildren, setGrandChildren] = useState([]);
    const [clicked, setClicked] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleClick = useCallback((index) => {
        const parentElement = elementRef.current[index];
        if (parentElement && parentElement.childNodes.length === 2) {
            const firstChild = parentElement.childNodes[0];
            const secondChild = parentElement.childNodes[1];

            const grandChild = {
                firstChild: firstChild.innerHTML,
                secondChild: secondChild.innerHTML
            };

            setGrandChildren(prev => {
                const updated = [...prev];
                updated[index] = grandChild;
                return updated;
            });

            setClicked(prev => ({ ...prev, [index]: true }));
            sort(grandChild, index);
        } else if (parentElement && parentElement.childNodes.length === 1) {
            const parentElement = elementRef.current[index];
            const grandChild = {
                firstChild: parentElement.firstChild.innerHTML,
                secondChild: ''
            };
            setGrandChildren(prev => {
                const updated = [...prev];
                updated[index] = grandChild;
                return updated;
            });
            setClicked(prev => ({ ...prev, [index]: true }));
            sort(grandChild, index);
        } else {
            alert('Element does not have the right number of nodes');
        }
    }, [elementRef]);

    const sort = (grandChild, index) => {
        let modalMessage = '';

        if (grandChild.firstChild > grandChild.secondChild) {
            const temp = grandChild.firstChild;
            grandChild.firstChild = grandChild.secondChild;
            grandChild.secondChild = temp;
            modalMessage = `Swapping Elements...\nElement 1: ${grandChild.firstChild}\nElement 2: ${grandChild.secondChild}`;
        } else if (grandChild.firstChild === grandChild.secondChild) {
            modalMessage = `Elements are equal. No need to swap.\nElement 1: ${grandChild.firstChild}\nElement 2: ${grandChild.secondChild}`;
        } else {
            modalMessage = `Elements are already sorted.\nElement 1: ${grandChild.firstChild}\nElement 2: ${grandChild.secondChild}`;
        }

        setModalContent(modalMessage);
        setModalShow(true);

        setGrandChildren(prev => {
            const updated = [...prev];
            updated[index] = grandChild;
            return updated;
        });
    };

    return { grandChildren, clicked, modalShow, modalContent, handleClick, setModalShow };
};

const Sort = (props) => {
    const { elementsHtml, elementRef } = useElementsHtml(props.array);
    const { grandChildren, clicked, modalShow, modalContent, handleClick, setModalShow } = useSort(elementRef);

    return (
        <>
            <Row>
                <h5>Click to Sort</h5>
                {elementsHtml.length > 0 ? (
                    elementsHtml.map((html, index) => (
                        <Col id={`col-sort-${index}-id-6`} size="md-2" key={index}>
                            <button
                                id={`button-sort-${index}-id-6`}
                                style={{ backgroundColor: 'gray' }}
                                onClick={() => handleClick(index)}>
                                <div ref={el => (elementRef.current[index] = el)}>
                                    <div dangerouslySetInnerHTML={{ __html: html }} />
                                </div>
                            </button>
                        </Col>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

                {Object.keys(clicked).length > 0 && (
                    <>
                        <h5>Sorted Elements</h5>
                        <div style={{ border: 'solid black 2px' }} className='row'>
                            {grandChildren.map((el, index) => (
                                <Col id={`col-sort-${index}-id-6`} size="md-2" key={index}>
                                    <motion.div
                                        style={{ padding: '1.5rem' }}
                                        initial={{ y: -300, opacity: 0 }}
                                        animate={{ y: -10, opacity: 1 }}
                                        transition={{ delay: index * 0.5 }}>
                                        <motion.p
                                            initial={{ y: -600, opacity: 0 }}
                                            animate={{ y: -10, opacity: 1 }}
                                            style={{ border: 'black solid 2px', margin: '1rem', padding: '1rem' }}>
                                            Element 1: {el.firstChild}
                                        </motion.p>
                                        <motion.p
                                            initial={{ y: -600, opacity: 0 }}
                                            animate={{ y: -10, opacity: 1 }}
                                            style={{ border: 'black solid 2px', margin: '1rem', padding: '1rem' }}>
                                            Element 2: {el.secondChild}
                                        </motion.p>
                                    </motion.div>
                                </Col>
                            ))}
                        </div>
                    </>
                )}
            </Row>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setModalShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Sort;
