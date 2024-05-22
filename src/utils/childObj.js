import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Arrays from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { motion } from 'framer-motion';

export default function Sort(props) {
    const [elementsHtml, setElementsHtml] = useState([]); // State to store the HTML content
    const [elementsLoaded, setElementsLoaded] = useState(false); // State to store Elements Loaded
    const elementRef = useRef([]); // Ref to store the element reference
    const [clicked, setClicked] = useState(false); // State to track if the element is clicked
    const [clickedObjects, setClickedObjects] = useState([]); // State to store the clicked object
    const [clickedObjects2, setClickedObjects2] = useState([]); // State to store the clicked object
    const [children, setChildren] = useState([]) //State to hold element thats been clicked
    const [grandChildren, setGrandChildren] = useState([]); //State to hold grand children
    const [grandChildrenLoaded, setGrandChildrenLoaded] = useState(false); //State to hold grand children loaded


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

        addClickedObjFunc();

    }, [props.array]);

    useEffect(() => {
        console.log(`Clicked Objjjjj`, clickedObjects);
        console.log(`Clicked Objjjjj2`, clickedObjects2);
        console.log(`Clicked CHILDDD`, children);

        addClickedObjFunc();
        console.log(`Grand Children: `, grandChildren);



    }, [props]);

    const handleClick = (index) => {
        const parentElement = elementRef.current[index];
        if (parentElement && parentElement.childNodes.length === 2) {
            const firstChild = parentElement.childNodes[0];
            const secondChild = parentElement.childNodes[1];

            setChildren(prevChildren => [...prevChildren, firstChild, secondChild]);

            setClickedObjects(prevState => ({
                ...prevState,
                [index]: {
                    firstChild: firstChild.innerText,
                    secondChild: secondChild.innerText
                }
            }));


        } else if (parentElement && parentElement.childNodes.length === 1) {

            // Node List
            const childNodes = parentElement.childNodes[0].childNodes;

            console.log(`Child NODES PARENT`, childNodes);


            // Make an Array from node lists
            const newChildren = [];
            childNodes.forEach((child, idx) => {
                newChildren[idx] = child;
            });

            console.log(`New CHILLLD: `, newChildren);

            // Set State with Child Divs
            setChildren(prevChildren => [...prevChildren, newChildren]);

            //Grab internal Text from nodes, set them in State Obj
            setClickedObjects2(prevState => ({
                ...prevState,
                [index]: {
                    firstChild: childNodes[0].innerText,
                    secondChild: childNodes[1].innerText
                }

            }));

            setClickedObjects(prevState => [...prevState, {
                [index]: {
                    firstChild: childNodes[0].innerText,
                    secondChild: childNodes[1].innerText
                }
            }]);

            setClicked(true);
            console.log(`Clicked: `, clicked);

        } else {
            console.log('Parent element does not have the right number of nodes');
            alert(`Element does not have right number of nodes`);
        };

    };

    const addClickedObjFunc = () => {
        const parentElement = elementRef.current;
        const grandChildrenArr = [];
        setClicked(true);

        if (parentElement) {
            console.log(`Parent Element: `, parentElement[0].childNodes);

            parentElement.forEach((child, index) => {
                let firstChild = child.childNodes[0];
                let secondChild = child.childNodes[1];

                console.log(`First Child ${index}: `, firstChild);
                console.log(`Second Child ${index}: `, secondChild);



                grandChildren[index] = { firstChild: firstChild.childNodes[0].childNodes[0].innerHTML, secondChild: secondChild.childNodes[0].childNodes[0].innerHTML }
                setGrandChildrenLoaded(true);
            });

            console.log(grandChildrenArr);


        };


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


            </Row>
        </>
    );
}
