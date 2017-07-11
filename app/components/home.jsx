import React, { Component } from 'react';
import { Link } from 'react-router'
import NavBar from './NavBar';

export default class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className= "text">
                    <h1>Welcome to the Margaret Hamilton Interplanetary Academy of JavaScript</h1>
                    <p>We've done the impossible, and that makes us mighty!</p>
                </div>

            </div>
        )
    }


}