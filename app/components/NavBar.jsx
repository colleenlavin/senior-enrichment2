import React, { Component } from 'react';
import { Link } from "react-router";

export default function NavBar() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
            <div className="container topnav">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                      <li><Link id="campuses" to="/campuses">Campuses</Link></li>
                    <li><Link id="students" to="/students">Students</Link></li>
                    <li><Link id="home" to="/">Home</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

