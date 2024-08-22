/* eslint-disable no-unused-vars */
import React from "react";
import './Navbar.scss';
import {hide,show} from '../../../slices/requestsPageVisibility';
import { useDispatch } from "react-redux";
function Navbar() {
    const dispatch = useDispatch();
    function openRequestsPage() {
        dispatch(show());
    }
    return (
        <nav>
            <h1>App Name</h1>
            <button onClick={openRequestsPage}>🔔</button>
        </nav>
    )
}
export default Navbar;