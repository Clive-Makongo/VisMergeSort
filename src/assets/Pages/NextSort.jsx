import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Arrays from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

const sort = (props) => {
    const [isClicked, setClicked] = useState([]);
    const { swapped, clicked, grandChildren } = props;
    console.log(grandChildren, ` :sort`);

    useEffect(() => {
        setClicked(clicked);
        console.log(clicked, ` :useEffect`);
    }, [props]);
};

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



    return (
        <>
            <h1>Next Sort Page</h1>
            <>{sort(props)}</>
            <>
                <div className='row d-flex flex-row'>
                    <div className='col-md-12 d-flex flex-row'>
                        {pairedLoaded &&
                            <>
                                {paired.map((el, index) => {
                                    <>
                                        
                                    </>
                                })}
                            </>
                        }
                    </div>
                </div>
            </>
        </>
    );
};

export default NextSortPage;