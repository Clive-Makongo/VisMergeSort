import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Number(props) {
    return (
        <div>
            <h4>
                {props.number}
            </h4>
        </div>
    )

}