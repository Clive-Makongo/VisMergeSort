import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Arrays from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

export default function Sort(props) {
    const [elementsHtml, setElementsHtml] = useState([]); // State to store the HTML content
    const [elementsLoaded, setElementsLoaded] = useState(false); // State to store Elements Loaded
    const elementRef = useRef([]); // Ref to store the element reference
    const [clicked, setClicked] = useState({}); // State to track if the element is clicked
    const [clickedObjects, setClickedObjects] = useState([]); // State to store the clicked object
    const [clickedObjects2, setClickedObjects2] = useState([]); // State to store the clicked object
    const [children, setChildren] = useState([]) //State to hold element thats been clicked
    const [grandChildren, setGrandChildren] = useState([]); //State to hold grand children
    const [grandChildrenLoaded, setGrandChildrenLoaded] = useState(false); //State to hold grand children loaded
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [elementSwapped, setElementSwapped] = useState({});

    useEffect(() => {
        //console.log(`Props Array: `, props.array);
        //console.log(elementsHtml[0], `: Elements HTML`)
        // Select all elements with IDs matching the pattern
        const elements = document.querySelectorAll('[id^="id_6-child-row-"]');

        //console.log('Elements[0]: ', elements[0].childNodes[0]);

        // Extract innerHTML of each element and store in an array
        const htmlArray = Array.from(elements,
            el => el.innerHTML
        );

        // Set the HTML content array to state
        setElementsHtml(htmlArray);

        //console.log(`Elements HTML: `, elementsHtml);

        // Store references to the elements
        elementRef.current = Array.from(elements);
        //console.log(`Current: `, elementRef.current);

    }, [props.array]);

    useEffect(() => {
        if (elementsHtml.length === 0) {
            console.log(`NOT LOADED`);
        } else {
            //console.log(`LOADEDDDDDD`)
            setTimeout(() => {
                setElementsLoaded(true);
            }, 1000);
            //console.log(`Elements HTMLLLLL: `, elementsHtml);
        }
    });

    // useEffect(() => {
    //     const parentElement = elementRef.current;
    //     console.log(`Parent Element: `, parentElement);
    //     if (parentElement) {
    //         const childNodes = parentElement.forEach((el, index) => {
    //             console.log(`Child Nodes: `, el.childNodes);
    //             el.childNodes.forEach((child, idx) => {
    //                 child.childNodes.forEach((childNode, i) => {
    //                     console.log(`Grand Child Node${i}: `, childNode.childNodes[0]);
    //                 });
    //             });
    //          });
    //         console.log(`Child Nodes: `, childNodes);


    //     }
    //  },[])

    useEffect(() => {
        setClickedObjects([])
        setChildren([]);
        setGrandChildren([]);
        setClicked({});

        createSortObj();


    }, [props.array]);

    useEffect(() => {
        console.log(`Clicked: `, clicked);
        console.log(`Clicked Length: `, Object.keys(clicked).length);

    }, [grandChildrenLoaded, children, clickedObjects, clickedObjects2, clicked]);


    const handleClick = (index) => {

        const parentElement = elementRef.current[index];
        if (parentElement && parentElement.childNodes.length === 2) {
            const firstChild = parentElement.childNodes[0];
            const secondChild = parentElement.childNodes[1];

            setChildren(prevChildren => [...prevChildren, firstChild, secondChild]);


        } else if (parentElement && parentElement.childNodes.length === 1) {

            // Node List
            const childNodes = parentElement.childNodes[0].childNodes;;


            // Make an Array from node lists
            const newChildren = [];
            childNodes.forEach((child, idx) => {
                newChildren[idx] = child;
            });

            // Set State with Child Divs
            setChildren(prevChildren => [...prevChildren, newChildren]);


        } else {
            console.log('Parent element does not have the right number of nodes');
            alert(`Element does not have right number of nodes`);
        };

        createSortObj();

        setClicked({
            ...clicked,
            [index]: true
        });

        sort(index);

    };

    const createSortObj = () => {
        if (elementRef.current && elementRef.current.length > 0) {
            elementRef.current.forEach((el, index) => {
                if (el && el.childNodes.length > 0) {
                    const firstChildNode = el.childNodes[0];
                    const secondChildNode = el.childNodes[1];

                    if (firstChildNode && firstChildNode.childNodes.length > 0 && secondChildNode && secondChildNode.childNodes.length > 0) {
                        const firstChild = firstChildNode.childNodes[0]?.firstChild?.innerHTML;
                        const secondChild = secondChildNode.childNodes[0]?.firstChild?.innerHTML;
                        //console.log(`Second Child: `, secondChild);
                        //console.log(`First Child: `, firstChild);

                        grandChildren[index] = { firstChild, secondChild };
                        console.log(`Grand Children: `, grandChildren);

                        setGrandChildren([...grandChildren]);

                        setGrandChildrenLoaded(true);
                    }
                } else {
                    console.log(`Element ${index} does not have enough child nodes.`);
                }
            });
        } else {
            console.log('Element references are not loaded yet or empty.');
        }

    };

    const sort = (index) => {

        //alert(`Element 1: ${grandChildren[index].firstChild} Element 2: ${grandChildren[index].secondChild}`)
        if (parseInt(grandChildren[index].firstChild) > parseInt(grandChildren[index].secondChild)) {
            const temp = grandChildren[index].firstChild;
            grandChildren[index].firstChild = grandChildren[index].secondChild;
            grandChildren[index].secondChild = temp;

            setModalContent(`Element 1 is Larger than Element 2. Swapping Elements... 

            Element 1: ${grandChildren[index].firstChild} Element 2: ${grandChildren[index].secondChild}`);
            setModalShow(true);
            setElementSwapped({ index, swapped: true });
            console.log(`Element Swapped: `, elementSwapped);
        } else if (grandChildren[index].firstChild === grandChildren[index].secondChild) {
            console.log('Elements are equal. No need to swap.');
            setModalContent(`Element 1 is Equal to Element 2. No need to swap. 

            Element 1: ${grandChildren[index].firstChild} Element 2: ${grandChildren[index].secondChild}`);
            setModalShow(true);
        } else {
            console.log('Elements are already sorted');
            setModalContent(`Element 1 is Less than Element 2. No need to swap. 

            Element 1: ${grandChildren[index].firstChild} Element 2: ${grandChildren[index].secondChild}`);
            setModalShow(true);
        }

        setGrandChildren([...grandChildren]);
        console.log(`Sorted Grand Children: `, grandChildren);
    };


    return (
        <>
            <Row>
                <h5>Click to Sort</h5>
                {elementsLoaded && elementsHtml[0] !== '' && children ? (
                    elementsHtml.map((html, index) => (
                        <Col
                            id={`col-sort-${index}-id-6`}
                            name='button-children'
                            size="md-2"
                            key={index}>
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


                {grandChildrenLoaded && grandChildren.length > 0 &&
                    <>
                        <h5>Sorted Elements</h5>
                        <div style={{ border: 'solid black 2px' }} className='row'>
                            {grandChildren.length > 0 && (

                                grandChildren.map((el, index) => (
                                    <Col
                                        id={`col-sort-${index}-id-6`}
                                        name='button-children'
                                        size="md-2"
                                        key={index}>
                                        <motion.div
                                            style={{ padding: '1.5rem' }}
                                            className={`col-sort-${index}-id-6`}
                                            id={`div-sorting-${index}-id-6`}
                                            initial={{ y: -300, opacity: 0 }}
                                            animate={{ y: -10, opacity: 1 }}
                                            transition={{ delay: index * 0.5 }}
                                            key={`key-${index}`}
                                        >
                                            <motion.p
                                                key={`key-1-${index}`}
                                                initial={{ y: -600, opacity: 0 }}
                                                animate={{ y: -10, opacity: 1 }}
                                                style={{ border: 'black solid 2px', margin: '1rem', padding: '1rem' }}
                                            >
                                                Element 1: {el.firstChild}
                                            </motion.p>
                                            <motion.p
                                                key={`p-sort-${index}-id-6`}
                                                initial={{ y: -600, opacity: 0 }}
                                                animate={{ y: -10, opacity: 1 }}
                                                style={{ border: 'black solid 2px', margin: '1rem', padding: '1rem' }}
                                            >
                                                Element 2: {el.secondChild}
                                            </motion.p>
                                        </motion.div>
                                    </Col>

                                ))
                            )}
                        </div>

                    <div style={{display: 'flex', flex: 'row'}} className='row d-flex flex-row'>
                            {Object.keys(clicked).length === 6 &&  (
                                    grandChildren.map((el, index) => (
                                        <motion.div
                                            style={{padding: '1.5rem'}}
                                            className='col-md-2 d-flex flex-row justify-content-center align-items-center'
                                            initial={{ y: -600, opacity: 0 }}
                                            animate={{ y: -10, opacity: 1 }}
                                            transition={{ delay: index * 0.5 }}
                                        >
                                            <Col size="md-6">
                                                {el.firstChild}
                                            </Col>
                                            <Col size="md-6">
                                                {el.secondChild}
                                            </Col>
                                        </motion.div>
                                    ))                         
                            )}
                        </div>
                    </>
                }
            </Row>


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
}
