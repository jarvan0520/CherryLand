import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    render() {
        return (
            <div>
                <h1>you have been log out</h1>
                <Link to='/login'>login again</Link>
            </div>
        )
    }
}
