import React, { useRef, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Arrays from '../Components/Array';
import Container from '../Components/Container';
import Row from '../Components/Row';
import Col from '../Components/Column';
import { AnimatePresence, motion } from 'framer-motion';
import { Modal, Button } from 'react-bootstrap';

const sort = (props) => {
    const { swapped, clicked, grandChildren } = props;
    console.log(grandChildren, ` :sort`);
};

const NextSortPage = (props) => {
    const [grandChildren, setGrandChildren] = useState([]);
    console.log(props, ` :NextSortPage`);

    useEffect(() => {
        setGrandChildren(props.grandChildren);
    }, [props]);



    return (
        <>
            <h1>Next Sort Page</h1>
            <>{sort(props)}</>
            <>
                <div className='row d-flex flex-row'>
                    <div className='col-md-12 d-flex flex-row'>
                        {grandChildren.map((el, index) => {
                            return (
                                <>
                                    <div className='col-md-1'>
                                        <p>{el.firstChild}</p>
                                    </div>
                                    <div className='col-md-1'>
                                        <p>{el.secondChild}</p>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </>
        </>
    );
};

export default NextSortPage;