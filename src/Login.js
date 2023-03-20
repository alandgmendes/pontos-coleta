import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "POST",
      url: "http://localhost:4000/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        cookies.set("EMAIL", email);
        // redirect user to the auth page
        window.location.href = "/auth";

        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  };

  return (
    <>
      <h2>Login</h2>
      <div>
        {/* email */}
        <div controlId="formBasicEmail">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* password */}
        <div controlId="formBasicPassword">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* submit button */}
        <button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </div>
    </>
  );
}