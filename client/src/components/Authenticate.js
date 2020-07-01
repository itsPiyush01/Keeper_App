import React, { useState } from "react";
import { useScrollTrigger } from "@material-ui/core";
// import Input from "./Input"
import axios from "axios"
function Authenticate(props) {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevUser) => {
            return {
                ...prevUser,
                [name]: value
            }
        })
    }

    function SubmitUser(event) {
        event.preventDefault()
        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match");
            setUser((prevUser) => {
                return {
                    ...prevUser,
                    password: "",
                    confirmPassword: ""
                }
            })
        }
        else {
            axios
                .get("/api/authenticate/")
                .then(res => console.log(res))
                .catch(err => console.error(err))
        }
    }
    return (
        <form onSubmit={SubmitUser} >
            {/* *Required */}
            <input name="name"
                placeholder="Full Name"
                type="text"
                onChange={handleChange}
                value={user.name}
                required

            />
            <br />
            <input name="email"
                placeholder="Email"
                // type="email"
                onChange={handleChange}
                value={user.email}
                required />
            <br />
            <input name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                value={user.password}
                required />
            <br />
            <input name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
                value={user.confirmPassword}
                required />
            <br />
            <button type="submit">Register</button>
        </form>


    );
}

export default Authenticate;
