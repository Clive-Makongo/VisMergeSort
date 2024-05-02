import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Row from '../Components/Row';
import Col from '../Components/Column';

export default function Merge2(props) {


    return (
        <div>
            <button onClick={log}>LOG</button>
            <Row>
                <Col size="md-12">
                    <button onClick={splitRight}>Split</button>
                </Col>
            </Row>


        </div>
    )
}