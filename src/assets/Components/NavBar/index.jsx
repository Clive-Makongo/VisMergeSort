import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Learn from './Learn';

export default function Navbar() {

    return (
        <div>
            <Link to="learn" role="button" className="btn btn-link">
                Start Sort
            </Link>
            <Link to="contact" role="button" className="btn btn-link">
                Learn Less
            </Link>
            <Routes>
                <Route path="learn" element={<Learn />} />
            </Routes>
        </div>

    )
}